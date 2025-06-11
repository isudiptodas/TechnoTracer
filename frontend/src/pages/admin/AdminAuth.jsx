import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Footer from "../../components/Footer";
import axios from "axios";

function AdminAuth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        if (!email || !password) {
            toast.error("All fields required");
            return;
        }
        let id;
        try {
            id = toast.loading("Logging you in . . .");

            const res = await axios.post(`http://localhost:8080/login/admin`, {
                email: email,
                password: password,
                role: "ADMIN"
            }, {
                withCredentials: true
            });

            //console.log(res.data);

            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Login Successfull");
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000);
            }
        } catch (err) {
            if (err?.response?.data) {
                toast.error(err?.response?.data);
            }
            else {
                toast.error("Something went wrong");
            }
            console.log(err.message);
        }
        finally {
            toast.dismiss(id);
        }
    }

    return (
        <>
            <div className="w-full min-h-screen bg-black overflow-hidden flex flex-col justify-start items-center relative">

                <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
                <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <div className="w-[90%] md:w-[60%] lg:w-[40%] mt-8 z-30 h-auto rounded-md lg:rounded-xl xl:rounded-3xl py-5 px-4 border-[1px] border-white backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-3">

                    <div className={` w-full rounded-md px-3 h-auto py-4 flex flex-col justify-start items-center gap-3`}>
                        <p className="text-white font-Montserrat mb-5 font-medium text-3xl">Login as Admin</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
                        <div className="flex flex-col justify-center items-center w-full relative">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
                            <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <p onClick={login} className="w-full py-2 text-center rounded-md lg:rounded-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Enter <IoEnterOutline /></p>
                    </div>
                </div>

                <div className="w-full mb-20 py-2 flex justify-center items-center mt-10 md:w-[60%] lg:w-[40%]">
                    <Link to='/auth' className="w-auto active:scale-95 text-center pl-4 pr-2 py-1 text-[12px] md:text-sm rounded-full font-Montserrat bg-white text-black flex justify-center items-center gap-2 duration-200 ease-in-out">Enter as user ●</Link>
                </div>

                <div className="w-full h-44"></div>

                <Footer />

            </div>
        </>
    )
}

export default AdminAuth
