import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import Footer from "../components/Footer";

function Auth() {

  const [option, setOption] = useState('login');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const register = async () => {
    if (!email || !password || !name || !confirm) {
      toast.error("All fields required");
      return;
    }

    if (password !== confirm) {
      toast.error("Password and confirm password do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be 8 characters long");
      return;
    }

    try {
      const id = toast.loading("Registering you . . .");
      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  }

  const login = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const id = toast.loading("Logging you in . . .");
      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-black overflow-hidden flex flex-col justify-start items-center relative">

        <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
        <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

        <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

        <div className="w-[90%] md:w-[60%] lg:w-[40%] mt-8 z-30 h-auto rounded-md lg:rounded-xl xl:rounded-3xl py-5 px-4 border-[1px] border-white backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-3">
          <div className="w-full flex justify-center items-center gap-3">
            <p onClick={() => setOption('login')} className={`w-full text-center ${option === 'login' ? "text-white border-b-2 border-white" : "bg-transparent text-white"} font-Montserrat text-[12px] cursor-pointer hover:opacity-75 py-3 rounded-md`}>Login</p>
            <p onClick={() => setOption('signup')} className={`w-full text-center ${option === 'signup' ? "text-white border-b-2 border-white" : "bg-transparent text-white"} font-Montserrat text-[12px] cursor-pointer hover:opacity-75 py-3 rounded-md`}>Sign Up</p>
          </div>

          <div className={`${option === 'login' ? "block" : "hidden"} w-full rounded-md px-3 h-auto py-4 flex flex-col justify-start items-center gap-3`}>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
            </div>
            <p onClick={() => setOption('signup')} className="text-white w-full text-center text-[10px] lg:text-sm cursor-pointer">Don't have an account ? <Link>Create one</Link></p>
            <p onClick={login} className="w-full py-2 text-center mt-3 rounded-md lg:rounded-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Enter <IoEnterOutline /></p>
          </div>

          <div className={`${option === 'signup' ? "block" : "hidden"} w-full rounded-md px-3 h-auto py-4 flex flex-col justify-start items-center gap-3`}>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter full name" />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setConfirm(e.target.value)} value={confirm} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Confirm password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
            </div>
            <p onClick={() => setOption('login')} className="text-white w-full text-center text-[10px] lg:text-sm cursor-pointer">Already have an account ? <Link>Login</Link></p>
            <p onClick={register} className="w-full py-2 text-center mt-3 rounded-md lg:rounded-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Join <FaExternalLinkAlt /></p>
          </div>
        </div>

        <div className="w-full mb-20 py-2 flex justify-center items-center mt-10 md:w-[60%] lg:w-[40%]">
          <Link to='/admin/auth' className="w-auto active:scale-95 text-center pl-4 pr-2 py-1 text-[12px] md:text-sm rounded-full font-Montserrat bg-white text-black flex justify-center items-center gap-2 duration-200 ease-in-out">Enter as admin ●</Link>
        </div>

        <Footer/>

      </div>
    </>
  )
}

export default Auth
