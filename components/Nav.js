import Link from "next/link";
import {auth ,db} from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import AnimatedSvg from "./animatedSvg";

import { useRouter } from "next/router";

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


function Nav()
{
    const route = useRouter();
    const [user , loading] = useAuthState(auth);

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
        }else{console.log("Somethign went wrong...")}
    }, [user]);


    


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




    //theme stuff
    const [mounted, setMounted] = useState(false);
    const { systemTheme,theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) {
        return null;
      }

      const currentTheme = theme === "system" ? systemTheme : theme;


    return(
        <nav className="flex justify-between items-center py-10 sticky top-0 z-50  backdrop-blur-sm ">
            <Link href="/">
                <button className="text-xl font-bold ">blo<span className=" italic text-cyan-500 ">J</span>s</button>
            </Link>

            <ul className="flex items-center gap-10">

            {user && <AnimatedSvg
          currentTheme={currentTheme}
          onClick={() =>
            currentTheme === "dark" ? setTheme("light") : setTheme("dark")
          }

        />}


                {/* {currentTheme === "dark" ? (
                    <button
                    className="bg-black-700 hover:bg-black w-28 rounded-md border-cyan-500 border-2 p-4"
                    onClick={() => setTheme("light")}
                    >
                        {' '}
                        Light Mode
                    </button>
                ) : (
                    <button
                    className="bg-white hover:bg-gray-100 w-28 rounded-md border-cyan-500 border-2 p-4"
                    onClick={() => setTheme("dark")}
                    >
                        {' '}
                        Dark Mode
                    </button>
                )
                } */}

                {!user && (
                <Link href={"/auth/login"}>
                    <a  className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
                        <button onClick={GoogleLogin}>Join Now.</button>
                    </a>
                </Link>
                )}

                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post">
                            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm">
                                Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <img
                                className="w-12 rounded-full cursor-pointer hover:ring-2 ring-cyan-500 "
                                src={user.photoURL}
                                />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}

export default Nav;