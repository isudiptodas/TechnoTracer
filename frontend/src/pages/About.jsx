import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <div className="w-full min-h-screen overflow-hidden bg-zinc-950 flex flex-col justify-start items-center relative">
                
                <Link to='/' className="text-white p-5 z-40 cursor-pointer absolute top-10 left-5 text-xl"><MdOutlineKeyboardArrowLeft /></Link>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className="w-full text-3xl md:text-5xl my-5 text-white font-Montserrat text-center">About Us</h1>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10">Welcome to TechnoTracer
                    TechnoTracer is a dedicated lost and found platform designed specifically for our college community. Our mission is to provide a seamless and efficient 
                    way for students, faculty, and staff to report and recover lost items. With a user-friendly interface and a robust verification process, we aim to reunite lost 
                    items with their rightful owners quickly and securely.
                </p>

                <div className="h-[60vh]"></div>

                <Footer/>

            </div>
        </>
    )
}

export default About
