import { useRef, useState, useEffect } from "react"
import Footer from "../../components/Footer"
import MenuBar from "../../components/MenuBar"
import Vapi from "@vapi-ai/web";
import { FaRegCircleStop } from "react-icons/fa6";
import { LuSparkle } from "react-icons/lu";

function PastListing() {

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

  return (

    <>
      <div className="w-full min-h-screen bg-black overflow-hidden relative flex flex-col justify-start items-center">
        <MenuBar />

        <p onClick={askAI} className={`w-auto ${started ? "hidden" : "block"} z-30 px-5 text-[12px] hover:opacity-75 shadow-md lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out font-Montserrat bg-white text-black fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Ask AI <LuSparkle /></p>
        <p onClick={stopAI} className={`w-auto ${started ? "block" : "hidden"} z-30 px-5 text-[12px] lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out text-white font-Montserrat bg-gradient-to-r from-red-400 via-red-500 to-red-800 fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Stop AI <FaRegCircleStop /></p>

        <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Your Past Listings</h1>

        <Footer/>
      </div>
    </>
  )
}

export default PastListing
