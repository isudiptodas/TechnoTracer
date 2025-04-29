import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { TfiArrowTopRight } from "react-icons/tfi";
import MenuBar from '../../components/MenuBar';
import ItemBox from '../../components/ItemBox';
import Footer from '../../components/Footer';

function Dashboard() {

  const[filter, setFilter] = useState('');
  const[visible, setVisible] = useState(false);

  const data = [
    {
      id: 1,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 2,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 3,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 4,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 5,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 6,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 7,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 8,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 9,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
    {
      id: 10,
      title: `Charger Type-C`,
      date: `29.04.25`,
      found: `campus floor`
    },
  ]

  return (

    <>
      <div className="w-full bg-black min-h-screen flex flex-col justify-start items-center relative overflow-hidden">

        <MenuBar/> 

        <div className='w-full h-auto flex flex-col justify-start items-center gap-3 mt-5 py-3 px-3'>

          {/* search and filters */}
          <div className='w-full md:w-[70%] h-auto flex py-2 justify-center items-center gap-2 relative'>
            <input type="text" className='w-full py-2 md:py-3 px-3 rounded-full bg-zinc-800 text-white placeholder-gray-500 outline-none' placeholder='Enter search term' />
            <span className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><IoSearch /></span>
            <span onClick={() => setVisible(!visible)} className='p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-500 via-yellow-400 to-emerald-500 cursor-pointer hover:opacity-70 duration-150 ease-in-out active:scale-95'><FaFilter /></span>

            <div className={`${visible ? "block" : "hidden"} absolute w-auto px-1 py-1 rounded-md bg-zinc-800 -bottom-72 right-0 flex flex-col justify-center items-center gap-2`}>
              <p className='w-full text-center my-2 text-[12px] lg:text-sm font-semibold px-4 border-b-[1px] border-gray-400 py-3 text-white'>Select a category</p>
              <p onClick={() => {setFilter('books'); setVisible(!visible)}} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Books</p>
              <p onClick={() => {setFilter('electronics'); setVisible(!visible)}} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Electronics</p>
              <p onClick={() => {setFilter('study'); setVisible(!visible)}} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Study Material</p>
              <p onClick={() => {setFilter('wearables'); setVisible(!visible)}} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Wearables</p>
              <p onClick={() => {setFilter('misscellaneous'); setVisible(!visible)}} className='w-full text-start text-[12px] lg:text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-900 duration-150 ease-in-out cursor-pointer'>Miscellaneous</p>
            </div>

          </div>

          <div className='w-full px-3 md:w-[70%] py-4 h-auto flex flex-wrap justify-between items-center'>

            <div className='w-[60%] overflow-hidden h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-blue-300 to-blue-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Discover last 3 days</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Discover and search for lost items which are gone 3 days back</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Discover<TfiArrowTopRight /></p>
            </div>

            <div className='w-[35%] overflow-hidden h-56 lg:h-48 rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-800 flex flex-col justify-evenly items-start gap-3 px-4 py-2'>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-2xl md:text-3xl xl:text-4xl'>Success Stories</p>
              <p className='w-full text-start font-semibold text-white font-Montserrat text-[12px] md:text-sm'>Hear from those who we've helped</p>
              <p className='w-auto flex justify-start items-center bg-white rounded-full text-black px-4 py-2 gap-3 text-start hover:opacity-65 duration-200 ease-in-out cursor-pointer text-[12px]'>Read<TfiArrowTopRight /></p>
            </div>
          </div>

          <hr className='w-full md:w-[70%] my-4 bg-gray-400 h-[2px]'/>

          <h1 className='text-white w-full md:w-[70%] font-Montserrat my-5 text-2xl lg:text-4xl text-center px-3'>Explore recent items</h1>

          <div className='w-full md:w-[70%] h-auto py-4 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3'>
              {data.map((it, index)=> {
                return <ItemBox found={it.found} title={it.title} date={it.date} key={index}/>
              })}
          </div>
        </div>

        {/* footer */}
        <Footer/>

      </div>
    </>
  )
}

export default Dashboard
