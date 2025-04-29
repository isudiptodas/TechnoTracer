import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

function Privacy() {

    return (
        <>
            <div className="w-full min-h-screen overflow-hidden bg-zinc-950 flex flex-col justify-start items-center relative">
                <Link to='/' className="text-white p-5 z-40 cursor-pointer absolute top-10 left-5 text-xl"><MdOutlineKeyboardArrowLeft /></Link>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className="w-full text-3xl md:text-5xl my-5 text-white font-Montserrat text-center">Privacy Policy</h1>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10">TechnoTracer is committed to protecting the privacy and 
                    security of our users' personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
                </p>

                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start">Information we collect : </p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">1. Photos of lost or found items, descriptions, and other relevant details.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">2. Name, email address, profile photo and contact details.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">3. Scanned copies of identification documents, proof of ownership, or other relevant documents.  </p>
                
                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start">Data Protection : </p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">We follow best industry practices to encrypt and safeguard your personal data, as your data is our first priority.
                    Data such as passwords (hashed), documents of ownership proof (stored securely in cloud backup in case of future reference)
                </p>
               
            </div>
        </>
    )
}

export default Privacy
