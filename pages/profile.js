import React from 'react';
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

const editProfile = () => {

  const route = useRouter();
  const routeData = route.query;

  const [user, loading] = useAuthState(auth);
  const [userBio, setUserBio] = useState({bio: ""});

  const submitBio = async (e) => {
    e.preventDefault();

    if(userBio?.hasOwnProperty("id"))
    {
      const docRef = doc(db, 'users', userBio.id);
      const updatedDoc = {...userBio, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedDoc);  
      return route.push('/dashboard');
    }
  };


  const checkUser = () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");

    if(routeData.id)
    {
      setUserBio({bio: routeData.bio, id: routeData.id});
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);



  return (
    <div>
      <div className=' flex gap-2'>

          <input
                onChange={(e) => setUserBio({...userBio, bio: e.target.value})}
                type="text"
                value={userBio.bio}
                placeholder="Write your new Bio...😀"
                className="bg-gray-800 w-full p-2 text-white text-sm"
              />
              <button
                onClick={submitBio}
                className="bg-cyan-500 text-white py-2 px-4 text-sm"
              >
                Submit
              </button>
      </div>
      
    </div>
  )

}

export default editProfile