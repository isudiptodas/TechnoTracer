import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function SuperAdminUser() {

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        if(!email || !password){
            toast.error("All fields required");
            return;
        }

        let id;

        try {
            id = toast.loading("Logging you in . . .");
            const res = await axios.post(`http://localhost:8080/login/super-admin`, {
                email, password, role: "SUPER_ADMIN"
            });

            console.log(res.data);

            if(res.status === 200){
                toast.dismiss(id);
                toast.success("Login Successfull");
                setTimeout(()=> {
                    navigate('/super-admin/dashboard');
                }, 2000);
            }
        } catch (err) {
            if(err?.response?.data){
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


    return (
        <>
            <div className="w-full min-h-screen overflow-hidden bg-black flex flex-col justify-start pt-5 items-center relative">
                <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
                <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className="text-white z-30 capitalize font-Montserrat mt-5 text-3xl text-center">Welcome Super-Admin</h1>

                <div className={`w-[90%] md:w-[60%] lg:w-[40%] backdrop-blur-3xl rounded-lg mt-10 bg-white/10 border-[1px] border-white lg:rounded-2xl px-3 sm:px-8 lg:py-10 z-40 h-auto py-4 flex flex-col justify-start items-center gap-3`}>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
                    <div className="flex flex-col justify-center items-center w-full relative">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
                        <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>

                    <p onClick={login} className="w-full py-2 text-center mt-3 rounded-md lg:rounded-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Enter <IoEnterOutline /></p>
                 
                </div>

                <div className="w-full h-72 lg:h-40"></div>
                <Footer/>
            </div>
        </>
    )
}

export default SuperAdminUser
