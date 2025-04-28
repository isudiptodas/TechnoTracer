import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";

function Auth() {

  const [option, setOption] = useState('login');
  const [visible, setVisible] = useState(false);
  const[email, setEmail] = useState('');
  const[name, setName] = useState('');
  const[phone, setPhone] = useState('');
  const[password, setPassword] = useState('');
  const[confirm, setConfirm] = useState('');

  return (
    <>
      <div className="w-full min-h-screen bg-black overflow-hidden flex flex-col justify-start items-center relative">

        <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
        <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

        <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm">TECHNOTRACER</h1>

        <div className="w-[90%] md:w-[60%] lg:w-[40%] mt-10 z-30 h-auto rounded-md lg:rounded-lg py-5 px-4 border-[1px] border-white backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-3">
          <div className="w-full flex justify-center items-center gap-3">
            <p onClick={() => setOption('login')} className={`w-full text-center ${option === 'login' ? "bg-white text-black" : "bg-transparent text-white"} font-Montserrat text-[12px] cursor-pointer hover:opacity-75 duration-200 ease-in-out py-3 rounded-md`}>Login</p>
            <p onClick={() => setOption('signup')} className={`w-full text-center ${option === 'signup' ? "bg-white text-black" : "bg-transparent text-white"} font-Montserrat text-[12px] cursor-pointer hover:opacity-75 duration-200 ease-in-out py-3 rounded-md`}>Sign Up</p>
          </div>

          <div className={`${option === 'login' ? "block" : "hidden"} w-full rounded-md px-3 h-auto py-4 bg-white flex flex-col justify-start items-center gap-3`}>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye/> : <FaEyeSlash/>}</span>
            </div>
            <p className="w-full py-2 text-center rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-700 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Enter <IoEnterOutline /></p>
          </div>

          <div className={`${option === 'signup' ? "block" : "hidden"} w-full rounded-md px-3 h-auto py-4 bg-white flex flex-col justify-start items-center gap-3`}>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter full name" />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter contact number" />
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye/> : <FaEyeSlash/>}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-full relative">
              <input onChange={(e) => setConfirm(e.target.value)} value={confirm} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Confirm password" />
              <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye/> : <FaEyeSlash/>}</span>
            </div>
            <p className="w-full py-2 text-center rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-700 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Join <FaExternalLinkAlt/></p>
          </div>

        </div>

      </div>
    </>
  )
}

export default Auth
