import React from 'react';
import Image from 'next/image';
import errorImg from '../public/error404.jpg';
// import errorImg2 from '../public/loading.png';
import errorImg2 from '../public/loading-transformed.png';

const errorPage = () => {
  return (
    <div className='mt-9'>
      <div>
        <Image src={errorImg2} layout='responsive' objectFit='contain' />
        <h1 className=' italic font-hanson font-semibold text-center text-cyan-500'>ERROR 404</h1>
      </div>
    </div>
  );
};

export default errorPage;
