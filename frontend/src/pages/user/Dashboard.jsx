import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { TfiArrowTopRight } from "react-icons/tfi";
import MenuBar from '../../components/MenuBar';

function Dashboard() {

  return (

    <>
      <div className="w-full bg-black min-h-screen flex flex-col justify-start items-center relative overflow-hidden">

        <MenuBar/>

        <div className='w-full h-auto flex flex-col justify-start items-center gap-3 mt-5 py-3 px-3'>

          {/* search and filters */}
          <div className='w-full md:w-[70%] h-auto flex py-2 justify-center items-center gap-2'>
            <input type="text" className='w-full py-2 md:py-3 px-3 rounded-full bg-zinc-800 text-white placeholder-gray-500 outline-none' placeholder='Enter search term' />
            <span className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><IoSearch /></span>
            <span className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><FaFilter /></span>
          </div>

          <div className='w-full px-3 md:w-[70%] py-4 h-auto flex flex-wrap justify-between items-center'>

            <div className='w-[60%] h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-blue-300 to-blue-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Discover last 3 days</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Discover and search for lost items which are gone 3 days back</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Discover<TfiArrowTopRight /></p>
            </div>

            <div className='w-[35%] h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Success Stories</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Hear from those who we've helped</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Read<TfiArrowTopRight /></p>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default Dashboard
