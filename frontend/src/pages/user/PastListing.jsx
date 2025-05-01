import Footer from "../../components/Footer"
import MenuBar from "../../components/MenuBar"

function PastListing() {
  return (

    <>
       <div className="w-full min-h-screen bg-black overflow-hidden relative flex flex-col justify-start items-center">
            <MenuBar/>

            <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Your Past Listings</h1>

       </div>
    </>
  )
}

export default PastListing
