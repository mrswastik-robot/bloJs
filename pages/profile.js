import React from 'react'

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
  query,
  where,
} from "firebase/firestore";

const profile = () => {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [userData , setUserData] = useState([]);

    const getUserData = async () => {

        if (loading) return;
        if (!user) return route.push("/auth/login");

        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    };



  return (
    <div>profile</div>
  )
}

export default profile