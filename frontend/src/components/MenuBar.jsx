import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuBar() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
    }

    return (
        <>
            <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

            <span onClick={() => setVisible(!visible)} className='absolute text-white text-xl md:text-2xl top-10 right-8 cursor-pointer duration-150 ease-in-out z-[60]'>{visible ? <IoMdClose /> : <CiMenuFries />}</span>

            <div className={`${visible ? "-translate-y-0" : "-translate-y-full"} duration-300 ease-in-out z-50 w-full pt-20 lg:pt-0 h-screen lg:h-[60vh] flex flex-col justify-start lg:justify-center items-start gap-4 rounded-b-4xl backdrop-blur-3xl bg-white/10 py-3 px-5 lg:px-10 absolute top-0`}>
                <Link to='/user/dashboard' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Home <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></Link>
                <Link className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Report New Item <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></Link>
                <Link className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Testimonials <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></Link>
                <Link to='/user/settings' className='text-white cursor-pointer font-Montserrat text-4xl font-light flex justify-center items-center gap-3 group'>Settings <MdOutlineKeyboardArrowRight className='opacity-0 group-hover:opacity-100 duration-150 ease-in-out group-hover:scale-105' /></Link>
                <p onClick={logout} className='text-white cursor-pointer font-Montserrat text-4xl font-semibold'>Logout</p>
            </div>
        </>
    )
}

export default MenuBar
