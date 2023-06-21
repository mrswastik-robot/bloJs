import ReactHtmlParser from 'html-react-parser';
import Link from 'next/link';

export default function Message({ children, avatar, username, description, user }) {
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
          {typeof description === 'string' ? ReactHtmlParser(description) : description}
        </div>
        {children}
      </div>
    );
  }