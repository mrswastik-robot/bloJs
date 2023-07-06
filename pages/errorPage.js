import React from 'react';
import Image from 'next/image';
import errorImg from '../public/error404.jpg';
import errorImg2 from '../public/loading.png';

const errorPage = () => {
  return (
    <div className=' items-center top-0 bottom-0 left-0 right-0 mx-auto justify-center w-screen h-screen'>
      <div>
        <Image src={errorImg2} layout='responsive' objectFit='contain' />
      </div>
    </div>
  );
};

export default errorPage;
