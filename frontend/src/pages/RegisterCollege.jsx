import { useState } from "react"
import Footer from "../components/Footer"
import { states } from "../data/states";
import { colleges } from "../data/college";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterCollege() {

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [proof, setProof] = useState('');
    const [stateVisible, setStateVisible] = useState(false);
    const [collegeVisible, setCollegeVisible] = useState(false);
    const [state, setState] = useState('select');
    const [college, setCollege] = useState('select');
    const [contact, setContact] = useState('');
    const [allCollege, setAllCollege] = useState([]);
    const navigate = useNavigate();

    const register = async () => {

        const fields = [name, email, college, contact, password, confirm, proof, state];
        if(fields.some(field => !field)){
            toast.error("All fields are required");
            return;
        }

        if(password !== confirm){
            toast.error("Passwords do not match");
            return;
        }

        let id;

        try {
            id = toast.loading("Submitting your request");

            const res = await axios.post(`http://localhost:8080/register/admin`, {
                name: name,
                email: email,
                password: password,
                college: college,
                state: state,
                adminProof: proof,
                contact: contact
            }, {
                withCredentials: true
            });

            //console.log(res);
            if(res.status === 200){
                toast.success("Application submitted");
                setTimeout(()=> {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            if(err?.response?.data){
                toast.error(err?.response?.data);
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

    const handleCollege = (name) => {
    //console.log(name);

    for (let i = 0; i <= colleges.length; i++) {
      if (colleges[i].state === name) {
        //console.log(colleges[i]);
        const all = colleges[i].college;
        setAllCollege(all);
        return;
      }
    }
  }

    return (
        <>
            <div className="w-full min-h-screen overflow-hidden bg-black flex flex-col justify-start pt-5 items-center relative">
                <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
                <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <h1 className="text-white z-30 capitalize font-Montserrat mt-5 text-3xl text-center">Register your college</h1>
                <p className="text-white z-30 capitalize font-Montserrat text-sm text-center mt-2">Be a part of something that brings back people's smile</p>

                <div className={`w-[90%] md:w-[60%] lg:w-[40%] backdrop-blur-3xl rounded-lg mt-10 bg-white/10 border-[1px] border-white lg:rounded-2xl px-3 sm:px-8 lg:py-10 z-40 h-auto py-4 flex flex-col justify-start items-center gap-3`}>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter full name" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter email" />
                    <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter contact" />
                    <div className="flex flex-col justify-center items-center w-full relative">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Enter password" />
                        <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full relative">
                        <input onChange={(e) => setConfirm(e.target.value)} value={confirm} type={visible ? "text" : "password"} className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none" placeholder="Confirm password" />
                        <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-60 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <input onChange={(e) => setProof(e.target.value)} value={proof} type="text" className="w-full rounded-md outline-none bg-gray-200 py-2 px-3" placeholder="Enter proof link" />
                    <p className="text-[12px] text-white opacity-70 text-center w-full py-2 font-Montserrat">Please upload any document on any online data sharing platform like : box, dropbox or drive that proves that you are genuinely associated with the college and share the link here</p>

                    <p className='text-white font-Montserrat text-sm w-full text-start capitalize'>Choose state : </p>
                    <p onClick={() => setStateVisible(!stateVisible)} className={`bg-gray-200 text-black duration-200 ease-in-out w-full py-2 px-3 rounded-md capitalize text-sm lg:text-[16px] flex justify-between cursor-pointer items-center gap-2`}>{state} <MdOutlineArrowDropDown /></p>

                    <div className={`${stateVisible ? "block" : "hidden"} w-full h-56 rounded-md bg-gray-200 px-1 py-1 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
                        {states.map((st, index) => {
                            return <p onClick={() => { setState(st); setStateVisible(false); handleCollege(st); }} key={index} className='text-black w-full px-3 py-2 rounded-md hover:bg-gray-400 text-start font-Montserrat text-sm capitalize cursor-pointer duration-150 ease-in-out'>{st}</p>
                        })}
                    </div>

                    <div className={`${state === 'select' ? "hidden" : "block"} w-full flex flex-col justify-center items-center gap-3`}>
                        <p className='text-white font-Montserrat text-sm w-full text-start capitalize'>Choose college : </p>
                        <p onClick={() => setCollegeVisible(!collegeVisible)} className={`bg-gray-200 text-black duration-200 ease-in-out w-full py-2 px-3 rounded-md capitalize text-sm lg:text-[16px] flex justify-between cursor-pointer items-center gap-2`}>{college} <MdOutlineArrowDropDown /></p>

                        <div className={`${collegeVisible ? "block" : "hidden"} w-full h-56 rounded-md bg-gray-200 px-1 py-1 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
                            {allCollege.map((col, index) => {
                                return <p onClick={() => { setCollege(col); setCollegeVisible(false); }} key={index} className='text-black w-full px-3 py-2 rounded-md hover:bg-gray-400 text-start font-Montserrat text-sm capitalize cursor-pointer duration-150 ease-in-out'>{col}</p>
                            })}
                            <p className="w-full text-center text-gray-400 px-5 text-[12px] py-5">In case you did'nt find your college, maybe it's not available from our side</p>
                        </div>
                    </div>

                    <p onClick={register} className="w-full py-2 text-center mt-3 rounded-md lg:rounded-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500 text-white cursor-pointer hover:opacity-75 duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2">Submit <FaExternalLinkAlt /></p>
                    <p className="text-[12px] text-white opacity-70 text-center w-full py-2 font-Montserrat">After submitting our team will verify your details and after verification you can access your admin dashboard</p>
                    <p className="text-[12px] text-white opacity-70 text-center w-full py-2 font-Montserrat">NOTE: In case we find any of the details are invalid we have the rights to reject your application.</p>

                </div>

                <div className="w-full h-44"></div>
                <Footer/>
            </div>
        </>
    )
}

export default RegisterCollege
