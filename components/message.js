import ReactHtmlParser from 'html-react-parser';
import Link from 'next/link';

export default function Message({ children, avatar, username, description, user , title, mainImage }) {

  const truncateDiscription = (string, maxLength) => {
    const words = string.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return string;
  };


    return (
      <div className="bg-white p-8 border-b-2 rounded-lg">
        <div className="flex items-center gap-2">
          <img src={avatar} className="w-10 rounded-full" />
          <Link href={`/profilepage?user=${user}`}>   
          {/* //I want my user to go to the [profile].js page */}
              <h2>{username}</h2>
          </Link>
          
        </div>
        <div className="py-4">

          <div className=' mb-5 card grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-1 justify-items-center mx-auto my-auto'>

            <div className='  grid-rows-2 gap-1 lg:grid-rows-2 lg:gap-2 my-auto mx-auto'>
              <h3 className="text-3xl font-bold py-2 font-poppins">{title}</h3>
              {typeof description === 'string' ? ReactHtmlParser(truncateDiscription(description,30)) : truncateDiscription(description, 30)}
            </div>

            <div className=' py-2'>
              <img src={mainImage} className=" h-[13rem] w-[13rem] rounded-md" />
            </div>


          </div>

          
        </div>
        {children}
      </div>
    );
  }