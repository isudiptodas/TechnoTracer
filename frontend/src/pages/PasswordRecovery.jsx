import { useState } from "react"
import Footer from "../components/Footer"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function PasswordRecovery() {

    const[email, setEmail] = useState('');
    const[generatedOTP, setGeneratedOTP] = useState('');
    const[enteredOTP, setEnteredOTP] = useState('');
    const[otpVisible, setOtpVisible] = useState();
    const navigate = useNavigate();

    const checkMail = async () => {
        if(!email.trim()){
            toast.error("Please enter your email");
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOTP(otp);
        let id;
        
        try {
            id = toast.loading("Processing . . . ");
            const res = await axios.get(`http://localhost:8080/password-recovery?email=${encodeURIComponent(email)}&otp=${otp}`);

            if(res.status === 200){
                toast.dismiss(id);
                toast.success("OTP sent on mail");
                setOtpVisible(true);
            }
            //console.log(res);
        } catch (err) {
            if(err?.response?.data){
                toast.dismiss(id);
                toast.error(err.response.data);
            }
            else{
                toast.error("Something went wrong");
            }
            console.log(err);
        }
        finally{
            toast.dismiss(id);
        }
    }

    const verifyOTP = () => {
        if(!enteredOTP){
            toast.error("Please enter OTP");
            return;
        }

        if(generatedOTP.toString() !== enteredOTP){
            // console.log(generatedOTP);
            // console.log(enteredOTP);
            toast.error("Invalid OTP");
            return;
        }

        if(generatedOTP.toString() === enteredOTP){
            // console.log(generatedOTP);
            // console.log(enteredOTP);
            toast.success("OTP verified");
            const data = {
                email : email,
                verified: true
            }
            setTimeout(() => {
                navigate('/change-password', {
                    state: data
                });
            }, 2000);
        }
    }

    return (
        <>
            <div className={`w-full h-screen flex flex-col justify-start pt-3 items-center relative overflow-hidden bg-black`}>
                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 text-center text-white font-Montserrat'>Password Recovery</h1>
                <p className={`w-full text-center text-white mt-2 font-Montserrat text-sm`}>Try recovering your password in a few steps</p>

                <div className={`${otpVisible ? "hidden" : "block"} w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-start items-center gap-3 mt-8`}>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"  className={`w-full px-3 py-2 rounded-md bg-zinc-800 outline-none font-Montserrat text-white`} placeholder="Enter your email"/>
                    <p onClick={checkMail} className={`w-full py-2 text-center bg-white text-black font-Montserrat rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out active:scale-95`}>Find Email</p>
                </div>

                <p className={`${otpVisible ? "block" : "hidden"} w-[90%] md:w-[60%] lg:w-[40%] text-center font-Montserrat text-white px-5 py-2 rounded-md bg-zinc-800 text-lg my-5`}>{email}</p>

                <div className={`${otpVisible ? "block" : "hidden"} w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-start items-center gap-3 mt-8`}>
                    <input onChange={(e) => setEnteredOTP(e.target.value)} type="text"  className={`w-full px-3 py-2 rounded-md bg-zinc-800 outline-none font-Montserrat text-white`} placeholder="Enter your otp"/>
                    <p onClick={verifyOTP} className={`w-full py-2 text-center bg-white text-black font-Montserrat rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out active:scale-95`}>Verify OTP</p>
                </div>

                <div className={`h-[45vh] lg:h-[60vh] mt-10 w-full`}></div>

                <Footer/>
            </div>
        </>
    )
}

export default PasswordRecovery
