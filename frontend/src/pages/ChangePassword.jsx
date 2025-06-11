import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import { toast } from "sonner"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function ChangePassword() {

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.verified === true) {
            setEmail(location.state.email);
        }
        else{
            navigate('/');
        }

    }, []);

    const changePassword = async () => {

        if (!password.trim() || !confirm.trim()) {
            toast.error("Please enter both passwords");
            return;
        }

        if (password.trim() !== confirm.trim()) {
            toast.error("Passwords do not match");
            return;
        }

        let id;

        try {
            id = toast.loading("Changing password");

            const res = await axios.put(`http://localhost:8080/change-password?password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`);
            console.log(res);
            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Password changed");
                setTimeout(() => {
                    navigate('/auth')
                }, 2000);
            }
        } catch (err) {
            if (err?.response?.data) {
                toast.error(err.response.data);
            }
            else {
                toast.error("Something went wrong");
            }
        }
        finally {
            toast.dismiss(id);
        }
    }

    return (
        <>
            <div className={`w-full h-screen flex flex-col justify-start pt-3 items-center relative overflow-hidden bg-black`}>
                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 text-center text-white font-Montserrat'>Change Password</h1>

                <div className={` w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-start items-center gap-3 mt-8 relative`}>
                    <input onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} className={`w-full px-3 py-2 rounded-md bg-zinc-800 outline-none font-Montserrat text-white`} placeholder="Enter new password" />
                    <span onClick={() => setVisible(!visible)} className={`text-white opacity-55 absolute top-3 right-5`}>{visible ? <FaEye /> : <FaEyeSlash />}</span>

                    <input onChange={(e) => setConfirm(e.target.value)} type={visible ? "text" : "password"} className={`w-full px-3 py-2 rounded-md bg-zinc-800 outline-none font-Montserrat text-white`} placeholder="Confirm new password" />
                    <span onClick={() => setVisible(!visible)} className={`text-white opacity-55 absolute top-16 right-5`}>{visible ? <FaEye /> : <FaEyeSlash />}</span>

                    <p onClick={changePassword} className={`w-full py-2 text-center bg-white text-black font-Montserrat rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out active:scale-95`}>Change Password</p>
                </div>


                <div className={`h-[45vh] lg:h-[60vh] mt-10 w-full`}></div>

                <Footer />
            </div>
        </>
    )
}

export default ChangePassword
