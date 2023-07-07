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

const EditProfile = () => {

  const route = useRouter();
  const routeData = route.query;

  const [user, loading] = useAuthState(auth);
  const [userBio, setUserBio] = useState({bio: ""});

  
  // const [github, setGithub] = useState("");
  // const [linkedin, setLinkedin] = useState("");
  // const [instagram, setInstagram] = useState("");

  const [link, setLinks] = useState({github: "", linkedin: "", instagram: ""});

  const submitBio = async (e) => {
    e.preventDefault();

    if(userBio?.hasOwnProperty("id"))
    {
      const docRef = doc(db, 'users', userBio.id);
      const updatedDoc = {...userBio, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedDoc);  
      // return route.push('/dashboard');
    }

    if(link?.hasOwnProperty("id"))
    {
      const docRef2 = doc(db, 'users', link.id);
      const updatedDoc2 = {...link, timestamp: serverTimestamp() };
      await updateDoc(docRef2, updatedDoc2);  
      // return route.push('/dashboard');
    }

    return route.push('/dashboard');
  };

  // const handleLinks = async (e) => {
  //   e.preventDefault();

    
    
  // }


  const checkUser = () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");

    if(routeData.id)
    {
      setUserBio({bio: routeData.bio, id: routeData.id});
      setLinks({github: routeData.github, linkedin: routeData.linkedin, instagram: routeData.instagram, id: routeData.id});
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);



  return (
    <div>
      <div>
        <h1 className=' font-extrabold mt-2 font-clash'>Bio :-</h1>

          <input
                onChange={(e) => setUserBio({...userBio, bio: e.target.value})}
                type="text"
                value={userBio.bio}
                placeholder="Write your new Bio...😀"
                className="bg-gray-800 w-full p-2 text-white text-sm rounded-lg"
              />
              {/* <button
                onClick={submitBio}
                className="bg-cyan-500 text-white py-2 px-4 text-sm"
              >
                Submit
              </button> */}
      </div>

      <div>
        <h1 className=' font-extrabold mt-2 font-clash'>Links :-</h1>
        <form className=' flex-col space-y-3 mt-2'>
          <input onChange={(e) => setLinks({...link, github: e.target.value})}
          className="bg-gray-800 w-full p-2 text-white text-sm rounded-lg"
          placeholder='Github'
          value={link.github}
          />

          <input onChange={(e) => setLinks({...link, linkedin: e.target.value})}
          className="bg-gray-800 w-full p-2 text-white text-sm rounded-lg"
          placeholder='Linkedin'
          value={link.linkedin}
          />

          <input onChange={(e) => setLinks({...link, instagram: e.target.value})}
          className="bg-gray-800 w-full p-2 text-white text-sm rounded-lg"
          placeholder='Instagram'
          value={link.instagram}
          />

          <button
            onClick={submitBio}
            type='submit'
            className="bg-cyan-500 text-white py-2 px-4 text-sm rounded-lg"
            >
              Submit

          </button>

        </form>

      </div>
      
    </div>
  )

}

export default EditProfile