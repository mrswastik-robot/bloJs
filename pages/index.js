import Head from 'next/head';
import Message from '../components/message';
import { useEffect , useState } from 'react';
import {db, auth} from "../utils/firebase";
import { collection, onSnapshot ,orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import {useRouter} from "next/router";
import {FaComments} from 'react-icons/fa';


import {useAuthState} from "react-firebase-hooks/auth";
import Loader from '../components/loader';



export default function Home() {

  //creating a state with all posts
  const[allPosts, setAllPosts] = useState([]);

  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [isLoading , setIsLoading] = useState(true);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return unsubscribe;
  };


  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => { 
    if (!user){
      route.push("/auth/login");
    }
    
  }, [user, loading]);

  //using locomotive scroll
  useEffect(() => {
    (
      async() => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, []);

  if (isLoading) {
    return (
      <Loader />
    );
  }





  return (
    <div>
      <Head>
        <title>bloJs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/erase2.svg" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className=' font-hanson text-center mb-9'>Threads are stronger here. Start bloJing...</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{pathname: `/${post.id}` , query: {...post, timestamp: post.timestamp?.toString() }}}>
              <button>
                {/* {post.comments?.length > 0 ? post.comments?.length : 0} comments */}
                <FaComments className="inline-block ml-2 text-cyan-500" />
                </button>
            </Link>
          </Message>
        ))}
      </div>

      
    </div>
  )
}
