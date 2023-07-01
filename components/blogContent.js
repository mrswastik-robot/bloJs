import React from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'html-react-parser';


const blogContent = ({ children, avatar, username, description, user , title, mainImage }) => {
  return (

    <div className=" p-8 border-b-2 rounded-lg">
        <div className="flex items-center gap-2">
          <img src={avatar} className="w-10 rounded-full" />
          <Link href={`/profilepage?user=${user}`}>   
          {/* //I want my user to go to the [profile].js page */}
              <h2>{username}</h2>
          </Link>
          
        </div>
        <div className="py-4">

          <div className=' mb-5'>
              <h3 className="text-3xl font-bold py-2 font-poppins">{title}</h3>
              <img src={mainImage} className="w-full" />
          </div>

          {typeof description === 'string' ? ReactHtmlParser(description) : description}
          
        </div>
        {children}
      </div>
  );
}

export default blogContent