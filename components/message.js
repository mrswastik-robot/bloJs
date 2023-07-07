import ReactHtmlParser from 'html-react-parser';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Message({ children, avatar, username, description, user , title, mainImage , id , timestamp}) {

  const truncateDiscription = (string, maxLength) => {
    const words = string.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...Read more';
    }
    return string;
  };

  const formattedTimestamp = timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric', 
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long'
  }) : '';

  const { theme, setTheme } = useTheme();



    return (
      <div className={` ${theme === 'dark' ? 'dark:border-cyan-500 dark:hover:shadow-cyan-500 transform duration-200' : " "} p-8 border-b-2 rounded-lg mt-2 hover:shadow-2xl transform duration-200 break-all overflow-y-hidden cursor-pointer`}>
        <div className=' lg:flex lg:gap-[28rem] '>

          <div className="flex items-center gap-2">
            <img src={avatar} className="w-10 rounded-full" />
            <Link href={`/profilepage?user=${user}`}>   
            {/* //I want my user to go to the [profile].js page */}
                <h2 className=' cursor-pointer hover:underline font-medium '>{username}</h2>
            </Link>
            
          </div>

          <div className=' mt-3 text-xs text-opacity-40 font-extralight '>
            <p>{formattedTimestamp}</p>
          </div>

        </div>
        

        <div className="py-4">
          
        <Link href={{pathname: `/${id}` , query: {avatar, username, description, user , title, mainImage ,id}}}>

          <div className=' mb-5 card grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-1 justify-items-center mx-auto my-auto'>

            <div className='  grid-rows-2 gap-1 lg:grid-rows-2 lg:gap-2 my-auto mx-auto'>
              <h3 className="text-3xl font-bold py-2 font-space ">{title}</h3>
              {typeof description === 'string' ? ReactHtmlParser(truncateDiscription(description,30)) : truncateDiscription(description, 30)}
            </div>


            <div className=' py-2 cursor-pointer'>
              <img src={mainImage} className=" h-[13rem] w-[13rem] lg:h-[15rem] lg:w-[15rem] rounded-md" />
            </div>


          </div>
        </Link>


          
        </div>
        {children}
      </div>
    );
  }