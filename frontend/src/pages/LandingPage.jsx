import { Link } from "react-router-dom"
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { RiArrowDropRightLine } from "react-icons/ri";
import CountUp from 'react-countup';
import Marquee from "react-fast-marquee";
import Accordian from "../components/Accordian";
import { faq } from '../data/accordianFAQ.js';
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import meme from '../assets/meme.png';

function LandingPage() {

  const [pageLoaded, setPageLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loadingEnded, setLoadingEnded] = useState(false);

  useEffect(() => {
    const startAudio = () => {
      const audio = new Audio("/technologia.mp3");
      audio.play();
    }

    // if(loadingEnded){
    //   setTimeout(()=> {
    //     startAudio();
    //   },500);
    // }

    if (loadingEnded) {
      startAudio();
    }

    if (loadingEnded) {
      setTimeout(() => {
        setPageLoaded(true);
      }, 5000);
    }

  }, [loadingEnded]);

  return (
    <>

      {/* <div className={`w-full absolute z-50 bg-black h-screen overflow-hidden flex flex-col justify-center items-center gap-4 transition-transform duration-500 ease-in-out ${pageLoaded ? "-translate-y-full" : "translate-y-0"}`}>
        <div className={` absolute -translate-x-1/2 -translate-y-1/2 top-[45%] lg:top-[40%] left-1/2 w-auto inline-block p-[1.5px] overflow-hidden h-auto justify-center items-center rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-emerald-500`}>
          <p onClick={() => setClicked(true)} className={` w-auto px-3 py-2 rounded-full bg-black text-white font-Neuropol text-xl flex justify-center items-center gap-2 cursor-pointer`}>Enter <RxDoubleArrowRight /></p>
        </div>

        {clicked && (
          <CountUp
            className="text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-xl lg:text-3xl font-Neuropol"
            start={0}
            duration={3}
            end={100}
            onEnd={() => { setLoadingEnded(true); }}
          />
        )}
        <h1 className={`text-white z-50 bg-black h-screen flex justify-center items-center tracking-widest w-full ${loadingEnded ? "block" : "hidden"} font-DuneRise text-2xl lg:text-5xl xl:text-6xl motion-preset-focus motion-duration-2000 flex justify-center items-center gap-4`}>TECHNOLOGIA <img src={meme} className={` h-24 w-24 lg:h-32 lg:w-32 hidden md:block motion-preset-focus motion-duration-2000`} /></h1>
        <div className={`absolute md:hidden w-full bg-transparent h-full z-50 flex justify-center items-center`}>
          <img src={meme} className={`${loadingEnded ? "block" : "hidden"}  h-32 w-32 mt-44 motion-scale-in-[0.5] motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.75s]/rotate motion-delay-[0.75s]/blur`} />
        </div>
      </div> */}

      <div className={` w-full bg-black overflow-hidden relative min-h-screen flex flex-col justify-start items-center`}>
        <div className="h-56 w-56 lg:h-[500px] lg:w-72 z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-yellow-300 to-orange-800 -top-5 -left-16 blur-3xl lg:blur-[100px]"></div>
        <div className="h-56 w-56 lg:h-[300px] lg:w-[600px] z-10 absolute rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-black -top-20 left-24 blur-2xl lg:blur-[80px]"></div>

        {/* logo */}
        <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

        {/* hero section */}
        <div className="w-[90%] z-30 backdrop-blur-3xl bg-white/15 h-auto py-5 lg:py-7 px-3 rounded-md lg:rounded-lg flex flex-col justify-center items-center gap-3">
          <h1 className="w-full font-Montserrat text-center text-white font-semibold text-2xl md:text-4xl xl:text-5xl md:leading-12">Effortless Lost & Found For Students</h1>
          <p className="text-white text-center w-full text-[12px] md:text-sm xl:text-lg">Track and reclaim your lost belongings with ease</p>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5 lg:pt-5 lg:gap-3">
            <Link to='/auth' className="flex justify-center items-center gap-2 bg-white text-emerald-600 px-4 py-1 rounded-full hover:px-8 duration-200 ease-in-out cursor-pointer active:scale-95 mt-2lg:mt-0">Join <BsBoxArrowInUpRight /></Link>
            <Link to='/user/dashboard' className="text-white rounded-full px-4 py-1 border-2 flex justify-center items-center gap-2 cursor-pointer border-dashed lg:mt-0">Enter Profile <RiArrowDropRightLine /></Link>
          </div>
        </div>

        <h1 className="w-[90%] py-5 text-2xl lg:text-4xl md:py-8 mt-2 md:mt-5 font-Montserrat font-semibold text-center z-30 text-white">We helped recover <CountUp className="font-bold bg-gradient-to-r from-yellow-300 to-emerald-600 bg-clip-text text-transparent" start={0} end={150} duration={2} suffix="+ " />campus items</h1>


        {/* features grid */}
        <div className="w-full h-auto py-4 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-5">
          <div className="h-48 w-full px-5 rounded-md group lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative overflow-hidden">
            <div className="absolute -translate-x-full group-hover:-translate-x-0 duration-[600ms] ease-in-out transition-transform cursor-pointer h-[500px] w-[600px] bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-600 rounded-full z-10"></div>
            <h1 className="text-white z-30 font-semibold text-2xl sm:text-xl font-Montserrat">Report Lost Items</h1>
            <p className="text-center z-30 w-full text-white text-[12px] font-light">Report your lost items hassle-free in minutes. Register details and wait until found</p>
          </div>
          <div className="h-48 w-full px-5 rounded-md group lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative overflow-hidden">
            <div className="absolute -translate-x-full group-hover:-translate-x-0 duration-[600ms] ease-in-out transition-transform cursor-pointer h-[500px] w-[600px] bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-600 rounded-full z-10"></div>
            <h1 className="text-white z-30 font-semibold text-2xl sm:text-xl font-Montserrat">Search & Match</h1>
            <p className="text-center z-30 w-full text-white text-[12px] font-light">Find lost items based on categories and date or even with search</p>
          </div>
          <div className="h-48 w-full px-5 rounded-md group lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative overflow-hidden">
            <div className="absolute -translate-x-full group-hover:-translate-x-0 duration-[600ms] ease-in-out transition-transform cursor-pointer h-[500px] w-[600px] bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-600 rounded-full z-10"></div>
            <h1 className="text-white z-30 font-semibold text-2xl sm:text-xl font-Montserrat">Reclaim</h1>
            <p className="text-center z-30 w-full text-white text-[12px] font-light">Verify your identity and the ownership of your item and claim hassle-free.</p>
          </div>
          <div className="h-48 w-full px-5 rounded-md group lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative overflow-hidden">
            <div className="absolute -translate-x-full group-hover:-translate-x-0 duration-[600ms] ease-in-out transition-transform cursor-pointer h-[500px] w-[600px] bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-600 rounded-full z-10"></div>
            <h1 className="text-white z-30 font-semibold text-2xl sm:text-xl font-Montserrat">Rate & Review</h1>
            <p className="text-center z-30 w-full text-white text-[12px] font-light">Share your experience to make us better and help more people find their lost items.</p>
          </div>
        </div>

        {/* marquee */}
        <div className="w-[95%] h-auto py-5 flex justify-center items-center overflow-hidden">
          <Marquee className="overflow-hidden h-auto py-4" pauseOnHover={true} speed={80}>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">Headphones</p>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">Boards</p>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">Charger</p>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">Laptop case</p>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">Power Bank</p>
            <p className="text-5xl md:text-7xl text-gray-500 opacity-55 hover:opacity-100 duration-200 ease-in-out hover:scale-110 cursor-pointer font-bold mx-7 font-Montserrat">ID Card</p>
          </Marquee>
        </div>

        {/* faq */}
        <h1 className="w-[90%] py-5 text-2xl lg:text-4xl md:py-8 mt-2 md:mt-5 font-Montserrat font-semibold text-center z-30 text-white">Frequently Asked Questions</h1>

        <div className="w-[95%] h-auto py-3 pb-10 lg:pb-28 px-5 flex flex-col justify-center items-center gap-5">
          {faq.map((item, index) => {
            return <Accordian key={index} title={item.title} content={item.content} />
          })}
        </div>

        {/* footer */}
        <Footer />

      </div>
    </>
  )
}

export default LandingPage
