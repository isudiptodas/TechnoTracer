import { useState, useRef, useEffect } from "react"
import Footer from "../../components/Footer"
import MenuBar from "../../components/MenuBar"
import { IoIosCloudUpload } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Vapi from "@vapi-ai/web";
import { FaRegCircleStop } from "react-icons/fa6";
import { LuSparkle } from "react-icons/lu";

function Report() {

    const [itemName, setItemname] = useState('');
    const [info, setInfo] = useState('');
    const [foundAt, setFoundAt] = useState('');
    const [contact, setContact] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('select');
    const [categoryVisible, setCategoryVisible] = useState(false);

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

    const categoryList = [
        'stationery',
        'electronics',
        'medical item',
        'clothing',
        'document',
    ];

    return (

        <>
            <div className="w-full min-h-screen overflow-hidden bg-black flex flex-col justify-start items-center relative">
                <MenuBar />

                <p onClick={askAI} className={`w-auto ${started ? "hidden" : "block"} z-30 px-5 text-[12px] hover:opacity-75 shadow-md lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out font-Montserrat bg-white text-black fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Ask AI <LuSparkle /></p>
                <p onClick={stopAI} className={`w-auto ${started ? "block" : "hidden"} z-30 px-5 text-[12px] lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out text-white font-Montserrat bg-gradient-to-r from-red-400 via-red-500 to-red-800 fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Stop AI <FaRegCircleStop /></p>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Report an Item</h1>

                {/* upload box */}
                <div className="w-[95%] mb-20 md:w-[70%] lg:w-[40%] h-auto flex flex-col justify-start items-center gap-3 rounded-md lg:rounded-xl bg-zinc-800 py-5 px-4">

                    {/* upload image */}
                    <div className="w-1/2 h-40 hover:scale-110 ease-in-out duration-200 cursor-pointer rounded-md border-4 overflow-hidden border-dashed relative border-gray-500 bg-black flex flex-col justify-center items-center">
                        <IoIosCloudUpload className={`text-gray-400 text-5xl ${image === null ? "block" : "hidden"}`} />
                        <p className={`w-full text-gray-300 text-[10px] py-2 font-Montserrat text-center ${image === null ? "block" : "hidden"}`}>Click here to upload image</p>
                        <p className={`w-full text-gray-300 text-[12px] lg:text-lg py-2 font-Montserrat text-center ${image === null ? "hidden" : "block"}`}>{image?.name}</p>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="bg-white h-full w-full absolute opacity-0" />
                    </div>

                    <div className={`w-full ${image === null ? "hidden" : "block"} flex justify-center items-center gap-3`}>
                        <p className="w-auto px-3 py-2 rounded-md text-white bg-blue-500 cursor-pointer hover:opacity-65 duration-150 ease-in-out relative overflow-hidden">Change <input type="file" onChange={(e) => setImage(e.target.files[0])} className="absolute left-0 opacity-0" /></p>
                        <p className="w-auto px-3 py-2 rounded-md text-white bg-red-500 cursor-pointer hover:opacity-65 duration-150 ease-in-out" onClick={() => { setImage(null) }}>Remove</p>
                    </div>

                    <input type="text" className="w-full py-2 px-3 rounded-md bg-black mt-5 text-white placeholder-gray-400 font-Montserrat outline-none" placeholder="Enter item name" />
                    <textarea className="w-full h-44 py-2 px-3 rounded-md bg-black text-white placeholder-gray-400 font-Montserrat outline-none" placeholder="Enter brief info" />
                    <input type="text" className="w-full py-2 px-3 rounded-md bg-black mt-1 text-white placeholder-gray-400 font-Montserrat outline-none" placeholder="Item found at" />
                    <input type="text" className="w-full py-2 px-3 rounded-md bg-black mt-1 text-white placeholder-gray-400 font-Montserrat outline-none" placeholder="Enter contact number" />
                    <p className="w-full text-start text-white font-Montserrat text-[14px] px-2 lg:text-lg">Select category : </p>
                    <p onClick={() => { setCategoryVisible(!categoryVisible) }} className={`capitalize w-full flex justify-between items-center px-2 py-2 ${categoryVisible ? "bg-white text-black" : "bg-black text-white"} font-Montserrat text-[14px] lg:text-lg cursor-pointer rounded-md`}>{category}<MdOutlineArrowDropDown className="text-2xl" /></p>

                    <div className={`w-full rounded-md py-1 px-1 bg-black ${categoryVisible ? "h-auto block" : "h-0 hidden"} duration-150 ease-in-out transition-all flex flex-col justify-start items-start gap-2`}>
                        {categoryList.map((cat, index) => {
                            return <p onClick={() => { setCategory(cat); setCategoryVisible(false) }} key={index} className=" rounded-md w-full py-2 px-3 text-start text-white font-Montserrat text-[14px] lg:text-lg cursor-pointer hover:bg-zinc-800 ease-in-out duration-150 capitalize">{cat}</p>
                        })}
                    </div>

                    <p className="w-full py-2 lg:py-3 rounded-md text-center bg-white text-black font-Montserrat text-[12px] lg:text-lg cursor-pointer hover:opacity-70 ease-in-out duration-200 active:scale-95 font-semibold mt-1">Submit for review</p>
                </div>


                <Footer />
            </div>
        </>
    )
}

export default Report
