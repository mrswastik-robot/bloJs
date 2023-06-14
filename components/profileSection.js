import React from 'react'

 export default function ProfileSection ({children, name ,photoURL, bio}){
  return (
    <div className=' bg-white p-8 border-b-2 rounded-lg'>
        {/* <h1>hilla hila re hulle hulle</h1> */}
        <div className=' flex items-center gap-8'>
            <h1 className=' text-black'>{bio}</h1>
            <img src={photoURL} className="w-15 rounded-full" />
            <h2>{name}</h2>
            
        </div>
        {children}

    </div>
  )
}

