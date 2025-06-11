import { NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function MenuBar() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:8080/user/logout', {}, {
                withCredentials: true
            });

            //console.log(res.data);

             navigate('/');

        } catch (err) {
            toast.error(err?.response?.data);
            console.log(err.message);
        }
    }

    return (
        <>
            <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-20 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

            <span onClick={() => setVisible(!visible)} className='absolute text-white text-xl md:text-2xl top-10 right-8 cursor-pointer duration-150 ease-in-out z-[60]'>{visible ? <IoMdClose /> : <CiMenuFries />}</span>

            <div className={`${visible ? "-translate-y-0" : "-translate-y-full"} duration-300 ease-in-out z-50 w-full pt-20 lg:pt-0 h-screen lg:h-[60vh] flex flex-col justify-start lg:justify-center items-start gap-4 rounded-b-4xl backdrop-blur-3xl bg-white/10 py-3 px-5 lg:px-10 absolute top-0`}>
                <NavLink to='/user/dashboard' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Home <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></NavLink>
                <NavLink to='/user/report' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Report New Item <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></NavLink>
                <NavLink to='/user/past-listing' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Past Listings <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></NavLink>
                <NavLink to='/user/admin-contact' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Contact Admin <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></NavLink>
                <NavLink to='/user/settings' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Settings <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></NavLink>
                <p onClick={logout} className='text-red-500 cursor-pointer font-Montserrat text-4xl font-semibold'>Logout</p>
            </div>
        </>
    )
}

export default MenuBar
