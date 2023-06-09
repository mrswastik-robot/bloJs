import Message from "../components/message";
import { useState , useEffect } from "react";
import { useRouter } from "next/router";
import {auth , db, getAuth} from "../utils/firebase";
import {toast} from "react-toastify";
import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";

  import BlogContent from "../components/blogContent";
import Link from "next/link";
// import { a } from "react-spring";

export default function CommentSection(){

    const router = useRouter();
    const routeData = router.query;

    // console.log(routeData);
    // console.log(routeData.timestamp);

    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);


     //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      console.log(message);
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    // const user = getAuth().currentUser;
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
        // user: auth.currentUser.userUID,
        user:  auth.currentUser.uid,
      }),
    });
    setMessage("");
  };

  //now comments has been added in the database ab baari comments display krne ki on screen
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };


    //const docSnap = await getDoc(docRef);
    //setAllMessages(docSnap.data().comments);
  

  useEffect(() => {
    if(!router.isReady) return;
    getComments();
  },[router.isReady]);



  return (
    <div>

      {/* <Message {...routeData}></Message> */}
      <BlogContent {...routeData}></BlogContent>

      <div className=" md:flex gap-2 mt-5 text-xl">
        <p className=" font-clash">Liked it? See more from</p>
        <Link href={`/profilepage?user=${routeData.user}`}>
          <a className="text-blue-500 underline font-space">{routeData.username}</a>
        </Link>
      </div>


      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message 😀"
            className="bg-gray-800 w-full p-2 text-white text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold font-poppins">Comments</h2>
          {allMessage?.map((message) => (
            <div className=" p-4 my-4 border-2 rounded-lg dark:border-cyan-500" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                {/* <h2>{message.userName}</h2> */}
                <Link href={`/profilepage?user=${message.user}`}>   
                  {/* //I want my user to go to the [profile].js page */}
                  <h2 className=' font-semibold underline cursor-pointer font-space'>{message.userName}</h2>
                </Link>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );





   
}