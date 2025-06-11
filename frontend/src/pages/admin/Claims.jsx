import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import loading from '../../assets/loading.gif'
import MenuBarAdmin from "../../components/MenuBarAdmin"
import Footer from "../../components/Footer"
import { toast } from "sonner"

function Claims() {

    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState(null);
    const [option, setOption] = useState('pending');
    const [college, setCollege] = useState('');
    const [allClaims, setAllClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/admin/verify', {
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
                console.log(err);
                navigate('/');
            }
        }

        verifyUser();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/admin/details', {
                    withCredentials: true
                });

                //console.log(res.data);
                setCollege(res.data.college);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/fetch-claims?college=${encodeURIComponent(college)}`, {
                    withCredentials: true
                });

                //console.log(res);
                setAllClaims(res.data);

                const filtered = res.data.filter((claim) => {
                    return claim.college === college
                });

                setFilteredClaims(filtered);
            } catch (err) {
                console.log(err);
            }
        }

        fetchClaims();
    }, [college]);

    useEffect(() => {
        const filterData = async () => {
            if (option === 'pending') {
                const filtered = allClaims.filter((claim) => {
                    return claim.ownerFound === false
                });

                setFilteredClaims(filtered);
            }
            else {
                const filtered = allClaims.filter((claim) => {
                    return claim.ownerFound === true
                });

                setFilteredClaims(filtered);
            }
        }

        filterData();
    }, [option]);

    const truncate = (text) => {
        if (text.length <= 20) {
            return text;
        }

        return text.substr(0, 10) + "...";
    }

    const navigateProof = (text) => {
        window.open(text, '_blank');
    }

    const settleClaim = async () => {
        let id;
        try {
            id = toast.loading("Processing . . .");
            const res = await axios.put(`http://localhost:8080/admin/settle-claim?college=${encodeURIComponent(popupData?.college)}&name=${encodeURIComponent(popupData?.claimUserName)}&id=${popupData?.id}&itemId=${popupData?.itemId}`, {}, {
                withCredentials: true
            });

            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Claimed Settled");
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            toast.dismiss(id);
            setPopupVisible(false);
        }
    }

    const rejectClaim = async () => {
        let id;
        try {
            id = toast.loading("Processing . . .");
            const res = await axios.delete(`http://localhost:8080/admin/reject-claim?id=${popupData?.id}`, {
                withCredentials: true
            });

            if (res.status === 200) {
                toast.dismiss(id);
                toast.success("Claimed Rejected");
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            toast.dismiss(id);
            setPopupVisible(false);
        }
    }

    return (
        <>
            <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div>

            <div className={`${verified ? "block" : "hidden"} min-h-screen bg-black w-full flex flex-col justify-start items-center relative overflow-hidden`}>
                <MenuBarAdmin />

                {/* popup box */}
                <div className={`${popupVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"} z-20 transition-all duration-500 ease-in-out w-full h-full absolute bg-black/70 flex justify-center items-start pt-36`}>

                    <div className={`h-auto w-[90%] md:w-[70%] lg:w-[50%] bg-white py-5 px-3 overflow-hidden rounded-md lg:rounded-lg relative flex flex-col justify-between items-center lg:items-start lg:gap-4 gap-2 lg:flex-row`}>
                        <span onClick={() => setPopupVisible(false)} className="absolute top-5 right-5 text-2xl bg-white text-black py-1 px-3 rounded-full cursor-pointer active:scale-95 duration-150 ease-in-out">X</span>
                        <div className={`w-full h-60 lg:h-auto rounded-md lg:rounded-lg bg-teal-600 overflow-hidden relative`}>
                            <img src={popupData?.itemImage} className="w-full h-full object-cover" />
                            <div className="absolute w-full h-full bg-gradient-to-t from-black via-transparent to-transparent bottom-0 rounded-md lg:rounded-lg"></div>
                            <h1 className="text-white font-Montserrat absolute bottom-5 left-5 text-lg font-semibold">{popupData?.itemName}</h1>
                        </div>
                        <div className="w-full h-auto flex flex-col justify-start items-start">
                            <p className="text-sm font-Montserrat mt-2">Found By : {popupData?.itemFoundBy}</p>
                            <p className="text-sm font-Montserrat">Found At : {popupData?.itemFoundAt}</p>
                            <p className="text-sm font-Montserrat capitalize">Item Category : {popupData?.itemCategory}</p>
                            <p className="text-sm font-Montserrat">{popupData?.itemCategory}</p>

                            <hr className="w-full h-[1px] my-4 bg-gray-200" />

                            <p className="text-sm font-Montserrat mt-2">Claim By : {popupData?.claimUserName}</p>
                            <p className="text-sm font-Montserrat">Email : {popupData?.claimUserEmail}</p>
                            <p className="text-sm font-Montserrat capitalize">Contact : {popupData?.claimUserContact}</p>
                            <p className={`text-sm font-Montserrat text-blue-600 font-semibold mt-2 cursor-pointer ${popupData?.ownerFound === true ? "hidden" : "block"}`} onClick={() => navigateProof(popupData?.ownershipProof)}>Verification </p>

                            <div className={`w-full ${popupData?.ownerFound === true ? "hidden" : "block"} mt-3 flex justify-between items-center gap-3`}>
                                <p className="w-full rounded-md text-center py-2 bg-green-500 text-white font-Montserrat cursor-pointer hover:opacity-75 duration-150 ease-in-out" onClick={settleClaim}>Settle</p>
                                <p className="w-full rounded-md text-center py-2 bg-red-500 text-white font-Montserrat cursor-pointer hover:opacity-75 duration-150 ease-in-out" onClick={rejectClaim}>Reject</p>
                            </div>

                            <p className={`${popupData?.ownerFound === true ? "block" : "hidden"} w-full text-center mt-2 text-green-500 font-semibold font-Montserrat`}>Handed Over To Owner ✓</p>
                        </div>
                    </div>

                </div>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>All Claims</h1>

                <div className="w-[90%] md:w-[60%] lg:w-[40%] flex justify-between items-center gap-3">
                    <p onClick={() => setOption('pending')} className={`w-full text-center py-2 rounded-md ${option === 'pending' ? "bg-white text-black" : "bg-transparent text-white cursor-pointer hover:opacity-75 duration-150 ease-in-out font-Montserrat text-sm"}`}>Pending</p>
                    <p onClick={() => setOption('settled')} className={`w-full text-center py-2 rounded-md ${option === 'settled' ? "bg-white text-black" : "bg-transparent text-white cursor-pointer hover:opacity-75 duration-150 ease-in-out font-Montserrat text-sm"}`}>Settled</p>
                </div>

                <hr className="h-[1.5px] bg-gray-600 my-7 w-[90%] md:w-[70%] lg:w-[50%]" />

                <div className={`w-[95%] lg:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3`}>
                    {filteredClaims.length > 0 && filteredClaims.map((claim, index) => {
                        return <div key={index} className="w-full z-10 rounded-md lg:rounded-lg bg-zinc-700 py-3 px-3 flex flex-col justify-start items-start overflow-hidden relative" onClick={() => { setPopupData(claim); setPopupVisible(true); }}>
                            <div className="overflow-hidden h-48 w-full rounded-md lg:rounded-lg">
                                <img src={claim.itemImage} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-white font-Montserrat text-xl font-semibold mt-2">Item : {truncate(claim.itemName)}</p>
                            <p className="text-white font-Montserrat text-sm mt-1"> Found at : {claim.itemFoundAt}</p>
                            <p className="text-white font-Montserrat text-sm mt-1"> Found by : {claim.itemFoundBy}</p>
                            <p className="text-white font-Montserrat text-sm mt-1"> Claim submitted by : {claim.claimUserName}</p>
                        </div>
                    })}
                </div>

                <div className={`h-[60vh] w-full`}></div>
                <Footer />
            </div>

        </>
    )
}

export default Claims
