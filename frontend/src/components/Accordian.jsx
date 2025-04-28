import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Accordian({title, content}) {

  const[open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className="w-full md:w-[60%] h-auto py-4 px-3 bg-white rounded-md flex flex-col justify-start items-start">
        <h1 className="w-full text-sm md:text-lg xl:text-xl font-semibold font-Montserrat cursor-pointer hover:opacity-70 duration-200 ease-in-out flex justify-between items-center">{title} <MdOutlineKeyboardArrowRight className={`${open ? "rotate-90" : "rotate-0"} text-xl duration-200 ease-in-out`}/></h1>
        <p className={`text-black text-[10px] md:text-[13px] xl:text-sm pt-3 pb-1 ${open ? "h-auto block duration-200 ease-in-out transition-all" : "hidden duration-200 ease-in-out transition-all"}`}>{content}</p>
      </div>
    </>
  )
}

export default Accordian
