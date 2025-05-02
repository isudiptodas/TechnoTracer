import { useState } from "react"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { IoSend } from "react-icons/io5";
import { toast } from 'sonner';

function Feedback() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[city, setCity] = useState('');
    const[message, setMessage] = useState('');

    const sendMessage = async () => {
        if(!name || !email || !city || !message){
            toast.error("All fields are required");
            return;
        }

        const id = toast.loading("Sending message . . .");

        setTimeout(()=> {
            toast.dismiss(id);
        }, 2000);   
        setTimeout(()=> {
            toast.success("Message sent");
        }, 1000);   
    }

    return (
        <>
            <div className="w-full min-h-screen bg-black flex flex-col justify-start items-center relative">
                <Link to='/' className="text-white p-5 z-40 cursor-pointer absolute top-10 left-5 text-xl"><MdOutlineKeyboardArrowLeft /></Link>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Feedback</h1>

                <p className="w-full md:w-[70%] px-5 md:text-sm text-center text-white font-Montserrat text-[12px]">Your feedback and opinions matter to us. It helps us to know you better and us to improve our platform.</p>
                <p className="w-full md:w-[70%] px-5 md:text-sm text-center text-white font-Montserrat text-[12px]">Please leave a feedback on how we can improve our services and features.</p>
                <p className="w-full font-semibold md:w-[70%] px-5 md:text-sm text-center mt-10 text-white font-Montserrat text-[12px]">In case you have any query you can contact us at <span className="pl-2 cursor-pointer bg-gradient-to-r from-orange-500 via-yellow-400 to-emerald-500 bg-clip-text text-transparent">mail.technotracer@gmail.com</span></p>

                <div className="w-[90%] md:w-[60%] lg:w-[40%] bg-zinc-800 mt-10 flex flex-col justify-start items-center gap-3 rounded-md lg:rounded-lg px-4 py-5">
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full rounded-md px-3 py-2 text-white placeholder-gray-400 font-Montserrat outline-none bg-black" placeholder="Enter your name"/>
                    <input onChange={(e) => setCity(e.target.value)} value={city} type="text" className="w-full rounded-md px-3 py-2 text-white placeholder-gray-400 font-Montserrat outline-none bg-black" placeholder="Enter your city"/>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md px-3 py-2 text-white placeholder-gray-400 font-Montserrat outline-none bg-black" placeholder="Enter your email"/>
                    <textarea onChange={(e) => setMessage(e.target.value)} value={message} className="w-full rounded-md h-48 px-3 py-2 text-white placeholder-gray-400 font-Montserrat outline-none bg-black" placeholder="Write your message"/>
                    <p onClick={sendMessage} className="w-full py-2 text-center flex justify-center items-center gap-3 rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out active:scale-95 font-Montserrat bg-white text-black">Send <IoSend /></p>

                    <p className="w-full md:w-[70%] px-5 text-center text-white font-Montserrat text-[10px] md:text-[13px] py-3">We usually take around 2 business days to respond back. Thank you for the patience.</p>

                </div>

                <div className="h-[30vh]"></div>

                <Footer/>
            </div>
        </>
    )
}

export default Feedback
