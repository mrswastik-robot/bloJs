import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState , useRef, useMemo} from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react").then((mod) => mod.default), {
  ssr: false, // Prevents the Jodit editor from being rendered on the server
});

import sanitizeHtml from "sanitize-html";

import Loader from "../components/loader";

export default function Post() {
  const [post, setPost] = useState({ description: "" , title: "", mainImage: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const editor = useRef(null);

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();       //on submitting form , page refreshes by default so to avoid that this line of code is used it won't let it refresh so that no data will be lost.


    //Run checks for description
    if (!post.description || !post.title || !post.mainImage) {
      toast.error("Description Field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;  //yaha pr jabbhi error aa raha tab return krna jarrori isse ho ye raha ki submitpost fun. end ho jaa raha , return nhi krte to codeflow neeche collectionref ki taraf bhi jata aur firebase me collection tabbhi ban jata.(Watch at 1:19)
    }
    if (post.description.length > 50000) {
      toast.error("Description too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    //updating the existing post Watch at 2:05
    if(post?.hasOwnProperty("id")){
      const docRef = doc(db, 'posts', post.id);
      const updatedDoc = {...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedDoc);  //do arguements kyunki docRef document should be updated with updatedDoc values
      return route.push('/');
    }
    else   //so if having already the property then updating or editing or then making a new post
    {



    //Make a new post
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: "" , title: "", mainImage: ""});
    toast.success("Post has been made 🚀", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    return route.push("/");
  }
  };


  //Checking for the user , agar logged in nhi aur direct /post pr jaane chaahe to redirect him to login first
  const checkUser = async() => {
    if(loading) return <Loader/>;
    if(!user) route.push("/auth/login");
    
    //editing post
    //ab iske baad yaha pr check kr rhe ki agar routeData.id hain pehle se matlab naya post nhi hain pehle hi banaya jaa chuka hain tab edit ka option dere , ye dashboard.js se edit button me jo <Link> hain waha se material aa raha Watch at 2:00 hours
    //pr abhi bhi ek dikkat , edit ho jaa raha pr jab submit kr rhe to ek naya post ban jaa raha , apan ko database ka wo specific doc update krna hain na to iska code make a new post k upar hain Watch at 2:04
    if(routeData.id)
    {
      setPost({description: routeData.description, title:routeData.title, mainImage:routeData.mainImage , id: routeData.id});
    }
  };

  //aur iss checkUser ko tabhi run krna hain jab ya to loading ya user change ho
  useEffect(() => {
    checkUser();
  },[user, loading]);


  // Sanitize the HTML content before displaying it
  const sanitizedDescription = sanitizeHtml(post.description, {
    allowedTags: [], // Allow no tags
    allowedAttributes: {}, // Allow no attributes
  });


  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 400,
    toolbar: true,
    toolbarAdaptive: true,
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "paragraph",
      "|",
      "image",
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "hr",
      "eraser",
      "|",
      "fullsize",
      "print",
    ],

  }), []);




  return (
    <div className="my-20 p-7 shadow-lg rounded-lg dark:shadow-cyan-500 mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your Post" : "Create your post"}
        </h1>
        <div className="py-2">

          <h3 className="text-lg font-medium py-2">Title</h3>

          <input
            type="text"
            className="bg-gray-800 w-full text-white rounded-lg p-2 text-sm"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}

          />

          <h3 className="text-lg font-medium py-2">Main Image URL</h3>

          <input
            type="text"
            className="bg-gray-800 w-full text-white rounded-lg p-2 text-sm"
            placeholder="Main Image URL"
            value={post.mainImage}
            onChange={(e) => setPost({ ...post, mainImage: e.target.value })}

          />



          <h3 className="text-lg font-medium py-2">Description</h3>
          <div className="bg-gray-800  w-full text-black rounded-lg text-sm">
            <JoditEditor
              ref={editor}
              value={post.description}
              // onChange={(e) => setPost({ ...post, description: e.target.value })}
              onBlur={(newContent) =>
                setPost({ ...post, description: newContent })
              } // preferred to use only this option to update the content for performance reasons
              
              config={config}
      
            ></JoditEditor>

          </div>
          
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 50000 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/50000
          </p>
        </div>
        <button type="submit"
        className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm">
          Submit
        </button>
      </form>

      {/* <div
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      /> */}

      
    </div>
  );
}
