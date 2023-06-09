import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();       //on submitting form , page refreshes by default so to avoid that this line of code is used it won't let it refresh so that no data will be lost.


    //Run checks for description
    if (!post.description) {
      toast.error("Description Field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;  //yaha pr jabbhi error aa raha tab return krna jarrori isse ho ye raha ki submitpost fun. end ho jaa raha , return nhi krte to codeflow neeche collectionref ki taraf bhi jata aur firebase me collection tabbhi ban jata.(Watch at 1:19)
    }
    if (post.description.length > 300) {
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
    setPost({ description: "" });
    toast.success("Post has been made 🚀", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    return route.push("/");
  }
  };


  //Checking for the user , agar logged in nhi aur direct /post pr jaane chaahe to redirect him to login first
  const checkUser = async() => {
    if(loading) return;
    if(!user) route.push("/auth/login");
    
    //editing post
    //ab iske baad yaha pr check kr rhe ki agar routeData.id hain pehle se matlab naya post nhi hain pehle hi banaya jaa chuka hain tab edit ka option dere , ye dashboard.js se edit button me jo <Link> hain waha se material aa raha Watch at 2:00 hours
    //pr abhi bhi ek dikkat , edit ho jaa raha pr jab submit kr rhe to ek naya post ban jaa raha , apan ko database ka wo specific doc update krna hain na to iska code make a new post k upar hain Watch at 2:04
    if(routeData.id)
    {
      setPost({description: routeData.description , id: routeData.id});
    }
  };

  //aur iss checkUser ko tabhi run krna hain jab ya to loading ya user change ho
  useEffect(() => {
    checkUser();
  },[user, loading]);




  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your Post" : "Create your post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button type="submit"
        className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm">
          Submit
        </button>
      </form>
    </div>
  );
}
