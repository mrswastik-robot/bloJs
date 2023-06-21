import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from "../utils/firebase";
import { doc, getDoc, where , collection, query, getDocs} from "firebase/firestore";

import ProfileSection from '../components/profileSection';
import Message from '../components/message';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = router.query;
  const [userData, setUserData] = useState(null);

  const [userPosts, setUserPosts] = useState([]);

  //getting that user's profile data
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'users', user);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData);
        

        //getting that user's posts
        const postsCollectionRef = collection(db, 'posts');
        const postsQuery = query(postsCollectionRef, where('user', '==', user));
        const postsSnapshot = await getDocs(postsQuery);

        const userPostsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserPosts(userPostsData);

        
      } else {
        console.log('User data not found');
      }

      

    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { github, linkedin, instagram, bio } = userData;



  return (
    <div>
      {/* <h1>Profile Page</h1>
      <p>User: {user}</p>
      <p>Github: {github}</p>
      <p>LinkedIn: {linkedin}</p>
      <p>Instagram: {instagram}</p>
      <p>Bio: {bio}</p> */}

      <ProfileSection {...userData}>

      </ProfileSection>

      {userPosts.map((post) => {
        return (
          <div key={post.id}>
            <Message {...post} />
          </div>
        );
      })}

    </div>
  );
}
