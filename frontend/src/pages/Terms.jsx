import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Terms() {

    return (
        <>
            <div className="w-full min-h-screen overflow-hidden bg-zinc-950 flex flex-col justify-start items-center relative">
                <Link to='/' className="text-white p-5 z-40 cursor-pointer absolute top-10 left-5 text-xl"><MdOutlineKeyboardArrowLeft /></Link>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className="w-full text-3xl md:text-5xl my-5 text-white font-Montserrat text-center">Terms of Use</h1>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10">These Terms and Conditions govern your use of the TechnoTracer platform. By accessing or using our platform, you agree to be bound by these terms. </p>

                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start">User Responsibilities : </p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">1. Provide truthful and accurate information when reporting lost or found items.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">2. If apply for a claim, you need to submit necessary documents for ownership verification.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">3. Upload required documents in PNG, JPG, or PDF format.</p>
               
                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start">Verification : </p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">1. Our team verifies submitted documents to ensure authenticity. This process usually takes upto 2 business days.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">2. We verify the ownership of lost items to ensure rightful return. </p>
               
                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start">Item Recovery : </p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">1. Recover lost items from the admin office after successful verification. </p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">2. Handle items with care, and report any damage or issues in the item while submitting.</p>
                
                <p className="w-full md:w-[70%] text-white font-Montserrat text-sm font-semibold px-10 mt-5 capitalize text-center md:text-start"> NOTE - TechnoTracer is not responsible for :</p>

                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">1. Loss or damage to items during the recovery process.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">2. Errors or inaccuracies in user-submitted information.</p>
                <p className="w-full md:w-[70%] text-center md:text-start text-[10px] md:text-sm text-white font-Montserrat px-10 py-2">3. Any missing or damaged product in case of electronic goods.</p>
                
                <div className="h-[40vh]"></div>

                <Footer/>
            </div>
        </>
    )
}

export default Terms
