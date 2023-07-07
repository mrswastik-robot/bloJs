import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth, db} from "../../utils/firebase";
import {useRouter} from 'next/router';
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";

import Space from "../../public/figma_space.png";
import { useTheme } from "next-themes";

export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    // const [theme, setTheme] = useTheme("light");

    const googleProvider = new  GoogleAuthProvider();
    const GoogleLogin = async() => {

        try {

            const result = await signInWithPopup(auth, googleProvider);
            route.push("/");
            
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {

        if(user){
            route.push("/");
        }else{console.log("WAtch at 42min....isse ho ye raha ki if user is alrady logged in to / pe lekr jao taaki logged in user /auth/login pe jaane ka try kre to use na jaane do...")}
    }, [user]);


    // useEffect(() => {
    //   if (user) {
    //     const createUserDocument = async () => {
    //       const userRef = collection(db, "users");
    //       const querySnapshot = await getDocs(userRef);
    //       const userExists = querySnapshot.docs.some(
    //         (doc) => doc.data().uid === user.uid
    //       );
  
    //       if (!userExists) {
    //         try {
    //           await addDoc(userRef, {
    //             uid: user.uid,
    //             email: user.email,
    //             name: user.displayName,
    //             photoURL: user.photoURL,
    //             bio: "",
    //             createdAt: serverTimestamp(),
    //             updatedAt: serverTimestamp(),
    //           });
    //         } catch (error) {
    //           console.error("Error creating user document:", error);
    //         }
    //       }
    //     };
  
    //     createUserDocument();
    //   }
    // }, [user]);





    useEffect(() => {
      if (user) {
        const createUserDocument = async () => {
          const userRef = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(userRef);
  
          if (!docSnapshot.exists()) {
            try {
              await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                bio: "Hey there! I am using bloJs...",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                github:"",
                linkedin:"",
                instagram:"",
              });
            } catch (error) {
              console.error("Error creating user document:", error);
            }
          }
        };
  
        createUserDocument();
      }
    }, [user]);





  return (
    <div>
      <img src={Space.src} className="absolute top-0 left-0 sm:w-[25rem] h-[55rem] md:h-full md:w-full sm:object-cover  overflow-hidden -z-10 bg-[#000419]" />

      <div className="  items-center justify-center mt-[5rem]">
        <h1 className=" font-hanson text-white font-bold text-5xl text-center">Welcome to <span className=" font-poppins">blo<span className=" font-poppins text-cyan-500 italic">J</span>s</span></h1>

        <div className=" font-space md:text-2xl mt-9 text-white text-center">
          <p>hey guys,</p>
          <p>I understand the importance of fostering a sense of belonging, collaboration, and intellectual exchange. With this vision in mind, I have developed a blogging website that empowers students to share their thoughts, achievements, and experiences with fellow university members. This platform not only facilitates seamless communication but also enables users to connect through their social media handles, creating a vibrant and engaging community.</p>
          <p className=" mt-7">Start exploring the features and benifits of bloJs by signing in with your google account.</p>
        </div>
        
      </div>

      

        <div className=" relative group mt-5">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-200"></div>
          <button onClick={GoogleLogin} className=" relative text-white bg-black w-full font-medium font-poppins rounded-lg flex align-middle p-4 gap-2">
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

        </div>
        
      
    </div>
    
  );
}
