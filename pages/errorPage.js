import React from 'react';
import Image from 'next/image';
import errorImg from '../public/error404.jpg';

const errorPage = () => {
  return (
    <div className=' items-center justify-center w-screen h-screen'>
      <div className=' max-w-full'>
        <Image src={errorImg} layout='responsive' objectFit='contain' />
      </div>
    </div>
  );
};

export default errorPage;
