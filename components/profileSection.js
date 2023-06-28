import Link from "next/link";
import React from "react";
import { ImGithub, ImLinkedin, ImInstagram } from "react-icons/im";

export default function ProfileSection({
  children,
  name,
  photoURL,
  bio,
  github,
  linkedin,
  instagram,
}) {
  return (
    <div className=" bg-white p-8 border-b-2 rounded-lg">
      {/* <h1>hilla hila re hulle hulle</h1> */}
      <div className=" flex items-center justify-center gap-8">
        <h1 className=" text-black">{bio}</h1>
        <img src={photoURL} className="w-15 rounded-full" />
        <h2>{name}</h2>
      </div>


      <div className=" flex gap-x-[4rem] items-center justify-center my-7">


        {github != "" ? (
          <Link href={`${github}`} passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-2"
            >
              <ImGithub className=" text-2xl" />
              <h1 className=" text-black">Github</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImGithub className=" text-2xl" />
              <h1 className=" text-black">Github</h1>
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
              <h1 className=" text-black">Linkedin</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImLinkedin className=" text-2xl" />
              <h1 className=" text-black">Linkedin</h1>
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
              <h1 className=" text-black">Instagram</h1>
            </a>
          </Link>
        ) : (
          <Link href="/errorPage" passHref>
            <a className=" flex items-center gap-2">
              <ImInstagram className=" text-2xl" />
              <h1 className=" text-black">Instagram</h1>
            </a>
          </Link>
        )}


      </div>

      {children}

    </div>
  );
}
