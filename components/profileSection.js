import Link from "next/link";
import React from "react";
import { ImGithub, ImLinkedin, ImInstagram } from "react-icons/im";

import { useTheme } from "next-themes";

export default function ProfileSection({
  children,
  name,
  photoURL,
  bio,
  github,
  linkedin,
  instagram,
}) {

  const { theme, setTheme } = useTheme();


  return (
    <div className={` ${theme === 'dark' ? "dark:bg-[#d6ff0a] text-black" : "bg-white"} p-8 border-b-2 rounded-lg`}>
      {/* <h1>hilla hila re hulle hulle</h1> */}
      <div className="  flex-wrap  grid lg:grid-cols-3 justify-items-center items-center justify-center mx-auto my-auto gap-8">
        
        <h1 className=" font-satoshi text-lg">{bio}</h1>

        <div className=" justify-center items-center">
          <img src={photoURL} className="w-15 rounded-full" />
        </div>

        <div>
          <h2 className=" font-space font-bold text-3xl">{name}</h2>
        </div>
        
      </div>


      <div className="  grid gap-x-[4rem] md:items-center md:justify-center my-7 gap-y-4 lg:grid-cols-3 lg:justify-items-center font-poppins ">


        {github != "" ? (
          <Link href={`${github}`} passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-2"
            >
              <ImGithub className=" text-2xl" />
              <h1 className=" text-black hover:underline">Github</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImGithub className=" text-2xl" />
              <h1 className=" text-black hover:underline">Github</h1>
            </a>
          </Link>
        )}



        {linkedin != "" ? (
          <Link href={`${linkedin}`} passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-2"
            >
              <ImLinkedin className=" text-2xl" />
              <h1 className=" text-black hover:underline">Linkedin</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImLinkedin className=" text-2xl" />
              <h1 className=" text-black hover:underline">Linkedin</h1>
            </a>
          </Link>
        )}



        {instagram != "" ? (
          <Link href={`${instagram}`} passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-2"
            >
              <ImInstagram className=" text-2xl" />
              <h1 className=" text-black hover:underline">Instagram</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImInstagram className=" text-2xl" />
              <h1 className=" text-black hover:underline">Instagram</h1>
            </a>
          </Link>
        )}


      </div>

      {children}

    </div>
  );
}
