import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import ProfileSection from "../components/profileSection";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [yourPosts, setYourPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");

    // getting all the user specific posts
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid) , orderBy("timestamp" , "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setYourPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // getting user info
    const collectionRef2 = collection(db, "users");
    const q2 = query(collectionRef2, where("uid", "==", user.uid));
    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      setUserInfo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(userInfo);
    });
    return unsubscribe, unsubscribe2;
  };


  //Deleting post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };


  useEffect(() => {
    getData();
  }, [user, loading]);


  return (
    <div>
      <div className=" mt-2 ">

          <h1 className=" font-semibold ">Your Profile</h1>
          {userInfo.map((user) => {
            return (
              <ProfileSection
                {...user}
                key={user.id} >
                <Link href={{ pathname: "/profile" , query:user}}>
                  <button className="text-cyan-500 flex items-center justify-center gap-2 py-2 text-sm hover:underline cursor-pointer">
                    <AiFillEdit className="text-2xl " />
                    Edit Your Profile
                  </button>
                </Link>
              </ProfileSection>
              
            );
          }
          )}

      </div>
     
      <h1 className=" mt-2 font-semibold">Your Posts</h1>
      <div>
        {yourPosts.map((post) => {
          return (
            <Message {...post} key={post.id}>
              <div className="flex gap-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" />
                  Delete
                </button>
                <Link href={{ pathname: "/post" , query:post}}>
                  <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                    <AiFillEdit className="text-2xl" />
                    Edit
                  </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>
      <button onClick={() => auth.signOut()} className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm">Sign Out</button>
    </div>
  );
}
