import { useState, useRef, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { TfiArrowTopRight } from "react-icons/tfi";
import MenuBar from '../../components/MenuBar';
import ItemBox from '../../components/ItemBox';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Vapi from "@vapi-ai/web";
import { FaRegCircleStop } from "react-icons/fa6";
import { LuSparkle } from "react-icons/lu";
import axios from 'axios';
import loading from '../../assets/loading.gif';

function Dashboard() {

  const [filter, setFilter] = useState('');
  const [college, setCollege] = useState('');
  const[allPosting, setAllPosting] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [started, setStarted] = useState(false);

  const vapi = useRef(null);

  useEffect(() => {
    vapi.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC);
  }, []);

  const askAI = async () => {
    const options = {
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a voice assistant for a platform named "Technotracer" which is a campus lost and 
            found items platform. Whenever any user ask any query you have to give appropriate answer based on the below context.
            Answer only what was asked and nothing extra.
            Context : 
            In the dashboard section users can see list of all the items that people posted as found in the campus.
            If any user finds a new item and want to post it theb they can do it in report new items section which is available in the menubar (top right corner).
            If any user want to claim any item then visit the details page of the item and from there they can claim it and while claiming they need to submit proper
            proof of ownership for the admin to verify.`,
          },
        ],
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      name: "Technotracer voice assistant",
    }
    vapi.current?.start(options);
    setStarted(true);
    vapi.current?.say("Hello, I am your assistant for technotracer...how can i help you ?");
  }

  const stopAI = async () => {
    vapi.current?.stop();
    setStarted(false);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/user/details', {
          withCredentials: true
        });

        //console.log(res.data);
        setCollege(res.data.college);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosting = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/user/items/all?college=${encodeURIComponent(college)}`, {
          withCredentials: true
        });

        //console.log(resp);
        setAllPosting(resp.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosting();
  }, [college]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/user/verify', {
          withCredentials: true
        });

        //console.log(res);

        if (res.data === true) {
          setVerified(true);
        }
        else {
          navigate('/');
        }
      } catch (err) {
        //console.log(err);
        navigate('/');
      }
    }

    verifyUser();
  }, []);

  const navigateClaim = (Data) => {
    navigate('/user/item/details', { state: Data });
  }

  return (

    <>

      <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
        <img src={loading} />
      </div>

      <div className={`w-full ${verified ? "block" : "hidden"} bg-black min-h-screen flex flex-col justify-start items-center relative overflow-hidden`}>

        <p onClick={askAI} className={`w-auto ${started ? "hidden" : "block"} z-30 px-5 text-[12px] hover:opacity-75 shadow-md lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out font-Montserrat bg-white text-black fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Ask AI <LuSparkle /></p>
        <p onClick={stopAI} className={`w-auto ${started ? "block" : "hidden"} z-30 px-5 text-[12px] lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out text-white font-Montserrat bg-gradient-to-r from-red-400 via-red-500 to-red-800 fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Stop AI <FaRegCircleStop /></p>

        <MenuBar />

        <div className='w-full h-auto flex flex-col justify-start items-center gap-3 mt-5 py-3 px-3'>

          {/* search and filters */}
          <div className='w-full md:w-[70%] h-auto flex py-2 justify-center items-center gap-2 relative'>
            <input type="text" className='w-full py-2 md:py-3 px-3 rounded-full bg-zinc-800 text-white placeholder-gray-500 outline-none' placeholder='Enter search term' />
            <span className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><IoSearch /></span>
            <span onClick={() => setVisible(!visible)} className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><FaFilter /></span>

            <div className={`${visible ? "block" : "hidden"} absolute w-auto px-1 py-1 rounded-md bg-zinc-800 -bottom-72 right-0 flex flex-col justify-center items-center gap-2`}>
              <p className='w-full text-center my-2 text-[12px] lg:text-sm font-semibold px-4 border-b-[1px] border-gray-400 py-3 text-white'>Select a category</p>
              <p onClick={() => { setFilter('books'); setVisible(!visible) }} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Books</p>
              <p onClick={() => { setFilter('electronics'); setVisible(!visible) }} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Electronics</p>
              <p onClick={() => { setFilter('study'); setVisible(!visible) }} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Study Material</p>
              <p onClick={() => { setFilter('wearables'); setVisible(!visible) }} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Wearables</p>
              <p onClick={() => { setFilter('misscellaneous'); setVisible(!visible) }} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Miscellaneous</p>
            </div>

          </div>

          {/* <div className='w-full px-3 md:w-[70%] py-4 h-auto flex flex-wrap justify-between items-center'>

            <div className='w-[60%] overflow-hidden h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-blue-300 to-blue-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Discover last 3 days</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Discover and search for lost items which are gone 3 days back</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Discover<TfiArrowTopRight /></p>
            </div>

            <div className='w-[35%] overflow-hidden h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Success Stories</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Hear from those who we've helped</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Read<TfiArrowTopRight /></p>
            </div>
          </div>

          <hr className='w-full md:w-[70%] my-4 bg-gray-400 h-[2px]' /> */}

          <h1 className='text-white w-full md:w-[70%] font-Montserrat my-5 text-2xl lg:text-4xl text-center px-3'>Explore recent items</h1>

          <div className='w-full md:w-[70%] h-auto py-4 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3'>
            {allPosting.length > 0 && allPosting.map((post, index) => {
              return <ItemBox found={post.foundAt} img={post.itemImage} by={post.foundBy} title={post.itemName} key={index} clickNavigate={() => navigateClaim(post)} />
            })}
          </div>
        </div>

        {/* footer */}
        <Footer />

      </div>
    </>
  )
}

export default Dashboard
