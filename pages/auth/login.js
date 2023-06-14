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

export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

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
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button onClick={GoogleLogin} className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
