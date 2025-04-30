import MenuBar from '../../components/MenuBar.jsx'
import Footer from '../../components/Footer.jsx'
import profile from '../../assets/profile.jpg';
import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { states } from '../../data/states.js';
import { colleges } from '../../data/college.js';

function Settings() {

    const [profileVisible, setProfileVisible] = useState(false);
    const [stateVisible, setStateVisible] = useState(false);
    const [collegeVisible, setCollegeVisible] = useState(false);
    const [state, setState] = useState('select');
    const [college, setCollege] = useState('select');
    const [allCollege, setAllCollege] = useState([]);
    const[uploadVisible, setUploadVisible] = useState(false);
    const[image, setImage] = useState(null);

    const handleCollege = (name) => {
        //console.log(name);
        
        for(let i = 0; i<=colleges.length; i++){
            if(colleges[i].state === name){
                //console.log(colleges[i]);
                const all = colleges[i].college;
                setAllCollege(all);
                return;
            }
        }        
    }

    const handleSelect = (e) => {
        //console.log(e);
        setImage(e);
    }

    return (
        <>
            <div className='w-full z-10 min-h-screen bg-black flex flex-col justify-start items-center overflow-hidden relative' >
                <MenuBar />

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
                    <p className='w-full text-center text-white text-2xl md:text-4xl font-Montserrat mb-2'>Sudipto Das</p>
                    <div className='w-full lg:w-[50%] xl:w-[35%] flex flex-col justify-center items-center lg:flex-row'>
                        <p className='w-full text-center text-red-500 text-[12px] md:text-sm cursor-pointer flex justify-center items-center gap-2 font-Montserrat mb-1'>Remove Picture <FaTrashAlt /></p>
                        <p onClick={() => setUploadVisible(!uploadVisible)} className='w-full text-center text-blue-400 text-[12px] md:text-sm cursor-pointer flex justify-center items-center gap-2 font-Montserrat'>Change Picture <IoIosCloudUpload /></p>
                    </div>

                    <div className={`${uploadVisible ? "block" : "hidden"} w-full pt-5 flex flex-col justify-center items-center gap-2`}>
                        <input onChange={(e) => handleSelect(e.target.files[0])} type="file" className='w-full bg-white text-black font-Montserrat py-1 px-4 text-[12px] rounded-full text-center' />
                        <p className={`${image === null ? "hidden" : "block"} w-full py-2 text-[12px] lg:text-sm bg-blue-600 text-white font-Montserrat text-center rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out`}>Upload</p>
                        <p onClick={() => {setImage(null); setUploadVisible(false)}} className={`${image === null ? "hidden" : "block"} w-full py-2 text-[12px] lg:text-sm bg-red-500 text-white font-Montserrat text-center rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out`}>Cancel</p>
                    </div>
                </div>

                {/* basic info */}
                <div className='w-full my-5 md:w-[70%] lg:w-[40%] py-4 px-4 flex flex-col justify-start items-center gap-3 relative'>
                    <input type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update name' />
                    <input type="email" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update email' />
                    <input type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update contact' />

                    <p className='text-white font-Montserrat text-sm w-full text-start capitalize'>Choose state : </p>
                    <p onClick={() => setStateVisible(!stateVisible)} className={`${stateVisible ? "bg-white text-black" : "bg-zinc-800 text-white"} duration-200 ease-in-out w-full py-2 px-3 rounded-md capitalize text-sm lg:text-[16px] flex justify-between cursor-pointer items-center gap-2`}>{state} <MdOutlineArrowDropDown /></p>

                    <div className={`${stateVisible ? "block" : "hidden"} w-full h-56 rounded-md bg-zinc-800 px-1 py-1 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
                        {states.map((st, index) => {
                            return <p onClick={() => { setState(st); setStateVisible(false); handleCollege(st); }} key={index} className='text-white w-full px-3 py-2 rounded-md hover:bg-black text-start font-Montserrat text-sm capitalize cursor-pointer duration-150 ease-in-out'>{st}</p>
                        })}
                    </div>

                    <div className={`${state === 'select' ? "hidden" : "block"} w-full flex flex-col justify-center items-center gap-3`}>
                        <p className='text-white font-Montserrat text-sm w-full text-start capitalize'>Choose college : </p>
                        <p onClick={() => setCollegeVisible(!collegeVisible)} className={`${collegeVisible ? "bg-white text-black" : "bg-zinc-800 text-white"} duration-200 ease-in-out w-full py-2 px-3 rounded-md capitalize text-sm lg:text-[16px] flex justify-between cursor-pointer items-center gap-2`}>{college} <MdOutlineArrowDropDown /></p>

                        <div className={`${collegeVisible ? "block" : "hidden"} w-full h-56 rounded-md bg-zinc-800 px-1 py-1 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
                            {allCollege.map((col, index) => {
                                return <p onClick={() => { setCollege(col); setCollegeVisible(false); }} key={index} className='text-white w-full px-3 py-2 rounded-md hover:bg-black text-start font-Montserrat text-sm capitalize cursor-pointer duration-150 ease-in-out'>{col}</p>
                            })}
                        </div>
                    </div>

                    <p className='w-full py-2 lg:py-3 text-center bg-gradient-to-r from-emerald-400 to-emerald-600 text-white capitalize rounded-md cursor-pointer hover:opacity-70 duration-150 ease-in-out font-Montserrat my-2 font-semibold '>Update profile</p>
                </div>

                <Footer />
            </div>

        </>
    )
}

export default Settings
