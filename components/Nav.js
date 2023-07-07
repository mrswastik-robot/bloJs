import Link from "next/link";
import {auth} from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import AnimatedSvg from "./animatedSvg";


function Nav()
{
    const [user , loading] = useAuthState(auth);

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
        <nav className="flex justify-between items-center py-10 sticky top-0 z-50  backdrop-blur-md ">
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
                    <a  className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">Join Now.</a>
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
                                className="w-12 rounded-full cursor-pointer"
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