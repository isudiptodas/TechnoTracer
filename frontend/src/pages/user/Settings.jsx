import MenuBar from '../../components/MenuBar.jsx'
import Footer from '../../components/Footer.jsx'
import profile from '../../assets/profile.jpg';
import { useState, useRef, useEffect, Suspense } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import Vapi from "@vapi-ai/web";
import { FaRegCircleStop } from "react-icons/fa6";
import { LuSparkle } from "react-icons/lu";
import { GoOrganization } from "react-icons/go";
import { FaGlobeAmericas } from "react-icons/fa";
import axios from 'axios';
import loading from '../../assets/loading.gif';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaLock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Settings() {

    const [profileVisible, setProfileVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [verified, setVerified] = useState(false);
    const[passwordVisible, setPasswordVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [current, setCurrent] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const [started, setStarted] = useState(false);

    const vapi = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get('http://localhost:8080/user/details', {
                    withCredentials: true
                });

                //console.log(res.data);
                setUserDetails(res.data);
                setName(res.data.username);
                setEmail(res.data.email);
                setContact(res.data.contact);
            } catch (err) {
                console.log(err);
            }
        }

        const verifyUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/user/verify', {
                    withCredentials: true
                });

                //console.log(res);

                if (res.data === true) {
                    setVerified(true);
                }
                else {
                    navigate('/');
                }
            } catch (err) {
                //console.log(err);
                navigate('/');
            }
        }

        verifyUser();

        fetchUser();
    }, []);

    useEffect(() => {
        vapi.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC);
    }, []);

    const askAI = async () => {
        const options = {
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            model: {
                provider: "openai",
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a voice assistant for a platform named "Technotracer" which is a campus lost and 
                found items platform. Whenever any user ask any query you have to give appropriate answer based on the below context.
                Answer only what was asked and nothing extra.
                Context : 
                In the dashboard section users can see list of all the items that people posted as found in the campus.
                If any user finds a new item and want to post it theb they can do it in report new items section which is available in the menubar (top right corner).
                If any user want to claim any item then visit the details page of the item and from there they can claim it and while claiming they need to submit proper
                proof of ownership for the admin to verify.`,
                    },
                ],
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            name: "Technotracer voice assistant",
        }
        vapi.current?.start(options);
        setStarted(true);
        vapi.current?.say("Hello, I am your assistant for technotracer...how can i help you ?");
    }

    const stopAI = async () => {
        vapi.current?.stop();
        setStarted(false);
    }

    const handleSelect = (e) => {
        //console.log(e);
        setImage(e);
    }

    const updateProfile = async () => {
        if (name.trim() === '' || email.trim() === '' || contact.trim() === '') {
            toast.error("Empty fields are not allowed");
            return;
        }

        let id;

        try {
            id = toast.loading("Updating . . .");
            const res = await axios.put(`http://localhost:8080/user/update-profile?previous=${encodeURIComponent(userDetails?.email)}`, {
                name: name,
                email: email || userDetails.email,
                contact: contact,
                image: image,
            }, {
                withCredentials: true
            });

            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Profile Updated");
                setTimeout(() => {
                    navigate('/user/dashboard');
                }, 2000);
            }
        } catch (err) {
            if (err?.response?.data) {
                toast.error(err.response.data)
            }
            else {
                toast.error("Something went wrong");
            }
            console.log(err);
        }
        finally {
            toast.dismiss(id);
        }
    }

    const changePassword = async () => {
        if (!newPassword || !current) {
            toast.error("Please add current and new password");
            return;
        }

        if(newPassword.trim().length <= 7){
            toast.error("New password length must be 8 or more");
            return;
        }

        let id;

        try {
            id = toast.loading("Updating . . .");
            const res = await axios.put(`http://localhost:8080/user/update-password?email=${encodeURIComponent(userDetails?.email)}`, {
                currentPassword: current,
                newPassword: newPassword
            }, {
                withCredentials: true
            });

            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Password Changed");
                setTimeout(() => {
                    navigate('/user/dashboard');
                }, 2000);
            }
        } catch (err) {
            if (err?.response?.data) {
                toast.error(err.response.data)
            }
            else {
                toast.error("Something went wrong");
            }
            console.log(err);
        }
        finally {
            toast.dismiss(id);
        }
    }

    return (
        <>
            <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div>

            <div className={`${verified ? "block" : "hidden"} w-full z-10 min-h-screen bg-black flex flex-col justify-start items-center overflow-hidden relative`} >
                <MenuBar />

                <p onClick={askAI} className={`w-auto ${started ? "hidden" : "block"} z-30 px-5 text-[12px] hover:opacity-75 shadow-md lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out font-Montserrat bg-white text-black fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Ask AI <LuSparkle /></p>
                <p onClick={stopAI} className={`w-auto ${started ? "block" : "hidden"} z-30 px-5 text-[12px] lg:text-lg lg:right-10 lg:bottom-12 py-2 rounded-full cursor-pointer active:scale-95 duration-200 ease-in-out text-white font-Montserrat bg-gradient-to-r from-red-400 via-red-500 to-red-800 fixed bottom-9 right-5 flex justify-center items-center gap-2`}>Stop AI <FaRegCircleStop /></p>

                {/* profile pic enlarged */}
                <div className={`${profileVisible ? "scale-100 opacity-100 z-40" : "scale-0 opacity-0 z-30"} z-40 duration-300 ease-in-out transition-all w-[90%] h-[40%] lg:w-1/3 lg:h-1/2 rounded-md lg:rounded-lg overflow-hidden absolute top-32 bg-white`}>
                    <img src={profile} className='w-full h-full object-cover' />
                    <span onClick={() => setProfileVisible(!profileVisible)} className='px-3 py-1 rounded-full backdrop-blur-lg bg-white/95 text-black font-bold top-5 right-5 absolute text-sm cursor-pointer active:scale-95 duration-150 ease-in-out'>X</span>
                </div>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Update your profile</h1>

                {/* image div */}
                <div onClick={() => setProfileVisible(true)} className={`${profileVisible ? "z-20" : "z-40"} group w-28 cursor-pointer relative overflow-hidden h-28 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500`}>
                    <img src={profile} className='w-full h-full object-cover' />
                    <div className='h-[20%] lg:h-[40%] group-hover:opacity-75 opacity-0 duration-150 ease-in-out w-full bg-black flex justify-start items-center absolute bottom-0'>
                        <p className='text-white text-center text-[5px] lg:text-[12px] w-full'>Click to view</p>
                    </div>
                </div>


                {/* picture info div */}
                <div className='h-auto py-3 w-[60%] flex flex-col justify-start px-2 items-center'>
                    <p className='w-full text-center text-white text-2xl md:text-4xl font-Montserrat mb-2'>{userDetails?.username}</p>
                    <div className='w-full lg:w-[50%] xl:w-[40%] flex flex-col justify-center items-center lg:flex-row'>
                        <p className='w-full text-center text-red-500 text-[12px] md:text-sm cursor-pointer flex justify-center items-center gap-2 font-Montserrat mb-1'>Remove Picture <FaTrashAlt /></p>
                        <p onClick={() => setUploadVisible(!uploadVisible)} className='w-full text-center text-blue-400 text-[12px] md:text-sm cursor-pointer flex justify-center items-center gap-2 font-Montserrat'>Change Picture <IoIosCloudUpload /></p>
                    </div>

                    <div className={`${uploadVisible ? "block" : "hidden"} w-full pt-5 flex flex-col justify-center items-center gap-2`}>
                        <input onChange={(e) => handleSelect(e.target.files[0])} type="file" className='w-full bg-white text-black font-Montserrat py-1 px-4 text-[12px] rounded-full text-center' />
                        <p className={`${image === null ? "hidden" : "block"} w-full py-2 text-[12px] lg:text-sm bg-blue-600 text-white font-Montserrat text-center rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out`}>Upload</p>
                        <p onClick={() => { setImage(null); setUploadVisible(false) }} className={`${image === null ? "hidden" : "block"} w-full py-2 text-[12px] lg:text-sm bg-red-500 text-white font-Montserrat text-center rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out`}>Cancel</p>
                    </div>
                </div>

                <div className='w-full md:w-[70%] lg:w-[40%] flex flex-col justify-start items-start gap-2 mt-5 px-5'>
                    <p className='w-full text-white text-center font-Montserrat flex justify-center items-center gap-2'><span><GoOrganization /></span>{userDetails?.college}</p>
                    <p className='w-full text-white text-center font-Montserrat flex justify-center items-center gap-2'><span><FaGlobeAmericas /></span>{userDetails?.state}</p>
                </div>

                {/* basic info */}
                <div className='w-full my-5 md:w-[70%] lg:w-[40%] py-4 px-4 flex flex-col justify-start items-center gap-3 relative'>

                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update name' />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update email' />
                    <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update contact' />

                    <p className='w-full py-2 lg:py-3 text-center bg-white text-black capitalize rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out font-Montserrat my-2 font-semibold active:scale-95 flex justify-center items-center gap-2' onClick={updateProfile}>Update profile <FaUserCheck /></p>

                    <div className='w-full h-auto py-2 flex flex-col justify-center items-center gap-2 relative'>
                        <input onChange={(e) => setCurrent(e.target.value)} value={current} type={passwordVisible ? "text" : "password"} className='w-full mt-5 rounded-md py-2 px-3 pr-10 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Enter current password' />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className='absolute text-white cursor-pointer opacity-55 top-10 right-5'>{passwordVisible ? <FaEye/> : <FaEyeSlash/>}</span>
                        
                        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={passwordVisible ? "text" : "password"} className='w-full rounded-md py-2 px-3 pr-10 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Enter new password' />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className='absolute text-white cursor-pointer opacity-55 top-[90px] right-5'>{passwordVisible ? <FaEye/> : <FaEyeSlash/>}</span>

                        <p className='w-full py-2 lg:py-3 text-center bg-white text-black capitalize rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out font-Montserrat my-2 font-semibold active:scale-95 flex justify-center items-center gap-2' onClick={changePassword}>Update Password <FaLock /></p>
                    </div>
                </div>

                <div className="w-full h-44 lg:h-32"></div>

                <Footer />
            </div>

        </>
    )
}

export default Settings
