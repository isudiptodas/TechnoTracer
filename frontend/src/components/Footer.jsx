import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <div className="w-full rounded-t-4xl h-64 flex flex-col justify-start items-center py-5 px-4 bg-gradient-to-br from-orange-400 via-yellow-400 to-emerald-500">
                <h1 className="w-full flex justify-center items-center md:py-5 z-30 text-black font-bold font-DuneRise text-[10px] md:text-sm xl:text-lg">TECHNOTRACER</h1>

                <div className="w-full mt-10 flex flex-col justify-center items-center gap-2 lg:gap-10 md:flex-row">
                    <Link to='/about' className="font-Montserrat text-sm xl:text-lg hover:font-semibold cursor-pointer hover:scale-110 duration-200 ease-in-out">About</Link>
                    <Link to='/privacy' className="font-Montserrat text-sm xl:text-lg hover:font-semibold cursor-pointer hover:scale-110 duration-200 ease-in-out">Privacy Policy</Link>
                    <Link to='/terms' className="font-Montserrat text-sm xl:text-lg hover:font-semibold cursor-pointer hover:scale-110 duration-200 ease-in-out">Terms of Use</Link>
                </div>
            </div>
        </>
    )
}

export default Footer
