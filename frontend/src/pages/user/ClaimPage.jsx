import { useLocation, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"
import MenuBar from "../../components/MenuBar"
import { FaRegHandPaper } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import loading from '../../assets/loading.gif';
import { toast } from "sonner";

function ClaimPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const Data = location.state;

  //console.log(Data);

  const [claimed, setClaimed] = useState(false);
  const [name, setName] = useState('');
  const[userDetails, setUserDetails] = useState(null);
  const [itemData, setItemdata] = useState(Data);
  const [contact, setContact] = useState('');
  const [link, setLink] = useState('');
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/user/details', {
          withCredentials: true
        });

        setUserDetails(res.data);

      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  const handleClaim = async () => {
    if (!name || !phrase || !contact || !link) {
      toast.error("All fields are required");
      return;
    }

    if(phrase.trim() !== "I agree to the terms"){
        toast.error("Please enter the phrase correctly");
        return;
    }

    let id;

    try {
      id = toast.loading("Submitting claim . . .");
      const res = await axios.post(`http://localhost:8080/user/add-claim`, {
        itemName: itemData.itemName,
        itemId: itemData.id,
        itemImage: itemData.itemImage,
        itemCategory: itemData.itemCategory,
        itemFoundBy: itemData.foundBy,
        itemFoundAt: itemData.foundAt,
        college: itemData.college,
        claimUserName: name,
        claimUserEmail: itemData.email,
        claimUserContact: contact,
        ownershipProof: link
      }, {
        withCredentials: true
      });

      //console.log(res);
      if(res.status === 200){
        toast.dismiss(id);
        toast.success("Claim submitted");
        setTimeout(() => {
          navigate('/user/dashboard');
        }, 2000);
      }
    } catch (err) {
      if(err?.response?.data){
        toast.error(err.response.data);
      }
      else{
        toast.error("Something went wrong");
      }
      console.log(err);
    }
    finally{
      toast.dismiss(id);
    }

  }

  const goBack = () => {
    navigate('/user/dashboard');
  }

  return (
    <>
      <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
        <img src={loading} />
      </div>

      <div className={` ${verified ? "block" : "hidden"} w-full min-h-screen bg-black overflow-hidden relative flex flex-col justify-start items-center`}>
        <MenuBar />

        <span onClick={goBack} className="flex z-40 cursor-pointer justify-center items-center gap-2 text-lg font-Montserrat absolute top-20 left-5 text-white"><IoIosArrowRoundBack className="text-2xl lg:text-3xl" /></span>

        {/* claim modal */}
        <div className={`${claimed ? "scale-100" : "scale-0 "} z-20 duration-500 ease-in-out transition-transform w-full h-full absolute flex justify-center items-center`}>

          <div className="w-full h-full absolute bg-black z-10 opacity-70"></div>

          <div className={`w-[90%] pb-10 px-5 md:w-1/2 h-auto z-20 relative bg-white rounded-md lg:rounded-lg flex flex-col justify-start items-center gap-3`}>
            <span onClick={() => setClaimed(false)} className="absolute top-5 right-5 text-2xl bg-black text-white py-1 px-3 rounded-full cursor-pointer active:scale-95 duration-150 ease-in-out">X</span>

            <p className="w-full mt-20 font-Montserrat text-lg lg:text-xl">Claim for item : <span className="font-semibold">{itemData.itemName}</span></p>
            <p className="w-full font-Montserrat text-lg lg:text-xl">College : <span className="font-semibold">Techno Main Salt Lake</span></p>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none text-black font-Montserrat" placeholder="Enter name" />
            <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none text-black font-Montserrat" placeholder="Enter contact number" />

            <p className="w-full text-center md:text-start text-[12px] lg:text-sm text-black font-Montserrat my-2">Submit a google drive or online link of file. We will use it to verify your ownership</p>
            <input onChange={(e) => setLink(e.target.value)} value={link} type="text" className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none text-black font-Montserrat" placeholder="Enter link" />

            <p className="w-full text-center md:text-start text-[12px] lg:text-sm text-black font-Montserrat my-2">Confirm your identity and claim by writing <span className="font-semibold">"I agree to the terms"</span></p>
            <input onChange={(e) => setPhrase(e.target.value)} value={phrase} type="text" className="w-full rounded-md bg-gray-200 px-3 py-2 outline-none text-black font-Montserrat" placeholder="Enter phrase" />
            <p onClick={handleClaim} className="w-full py-2 mt-2 lg:py-3 text-center rounded-md bg-black text-white font-Montserrat cursor-pointer hover:opacity-70 duration-200 ease-in-out active:scale-95">Submit Claim Request</p>
            <p onClick={() => { setName(''); setLink(''); setContact(''); setPhrase(''); setClaimed(false); }} className="w-full py-2 lg:py-3 text-center rounded-md bg-red-500 text-white font-Montserrat cursor-pointer hover:opacity-70 duration-200 ease-in-out active:scale-95">Cancel</p>
          </div>
        </div>

        <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Details</h1>

        <hr className="w-[90%] lg:w-[95%] mb-5 h-[1.5px] bg-white" />

        <div className="w-full mb-20 h-auto px-3 lg:px-5 py-4 flex flex-col justify-start items-center gap-3 md:flex-row">
          <div className="w-full md:w-[40%] rounded-md md:rounded-lg h-56 md:h-[400px] lg:h-[450px] bg-gradient-to-br from-red-400 via-red-600 to-red-700 overflow-hidden flex justify-center items-center">
            <img src={itemData.itemImage} className="w-full h-full object-cover" />
          </div>

          <div className="w-full h-auto py-5 md:h-[400px] lg:h-[450px] md:w-[60%] bg-zinc-800 md:bg-black rounded-md px-5 md:px-5 flex flex-col justify-start items-center gap-3">
            <h1 className="w-full text-white font-Montserrat text-center md:text-start text-xl md:text-3xl md:font-semibold py-2">{itemData.itemName}</h1>
            <h1 className="w-full text-white font-Montserrat md:text-start text-[12px] lg:text-lg py-2">{itemData.itemDescription}</h1>
            <h1 className="w-full text-white font-Montserrat text-center md:text-start text-[12px] lg:text-lg">Category : {itemData.itemCategory}</h1>
            <h1 className="w-full text-white font-Montserrat text-center md:text-start text-[12px] lg:text-lg">Found at : {itemData.foundAt}</h1>
            <p className={`w-full text-green-400 font-bold py-2 text-center font-Montserrat text-xl ${itemData.ownerFound ? "block" : "hidden"}`}>Handed over to owner</p>
            <p onClick={() => setClaimed(!claimed)} className={`${itemData.ownerFound ? "hidden" : "block"} w-full mt-2 px-3 z-10 py-2 rounded-full bg-white text-black font-Montserrat text-[12px] lg:text-lg cursor-pointer hover:opacity-70 ease-in-out duration-200 flex justify-center items-center gap-2`}>Claim <FaRegHandPaper /></p>
          </div>
        </div>


        <Footer />

      </div>
    </>
  )
}

export default ClaimPage
