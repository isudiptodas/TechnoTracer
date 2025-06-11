import MenuBarAdmin from "../../components/MenuBarAdmin"
import { useState, useEffect } from "react"
import loading from '../../assets/loading.gif'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";

function AdminDashboard() {

    const [verified, setVerified] = useState(false);
    const [name, setName] = useState('');
    const[searchTerm, setSearchTerm] = useState('');
    const [college, setCollege] = useState('');
    const [option, setOption] = useState('active');
    const [popupVisible, setPopupVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [allPosting, setAllPosting] = useState([]);
    const [filteredPosting, setFilteredPosting] = useState([]);
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState(allPosting[0]);

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
                const trimmed = res.data.name.split(' ')[0];
                //console.log(trimmed);
                setName(trimmed);
                setCollege(res.data.college);
                setEmail(res.data.email);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAllPosting = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/all-posting?email=${encodeURIComponent(email)}&college=${encodeURIComponent(college)}`, {
                    withCredentials: true
                });

                //console.log(res.data);
                setAllPosting(res.data);
                const filtered = res.data.filter((post)=> {
                    return post.verified === true && post.ownerFound === false;
                });

                setFilteredPosting(filtered);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAllPosting();
    }, [college, email]);

    useEffect(() => {
        const filterPosting = () => {
            if (option === 'active') {
                const filtered = allPosting.filter((post) => {
                    return post.verified === true && post.ownerFound === false
                });

                setFilteredPosting(filtered);
            }
            else if (option === 'settled'){
                const filtered = allPosting.filter((post) => {
                    return post.ownerFound === true
                });

                setFilteredPosting(filtered);
            }
            else{
                const filtered = allPosting.filter((post) => {
                    return post.ownerFound === false && post.verified === false
                });

                setFilteredPosting(filtered);
            }
        }

        filterPosting();
    }, [option]);

    const truncate = (text) => {
        if (text.length <= 20) {
            return text;
        }

        return text.substr(0, 10) + "...";
    }

    const acceptPosting = async (post) => {
        let id;

        try {
            id = toast.loading("Processing. . . ");
            const res = await axios.put(`http://localhost:8080/admin/approve-posting?college=${encodeURIComponent(post.college)}&foundBy=${encodeURIComponent(post.foundBy)}&id=${post.id}&email=${encodeURIComponent(post.email)}`, {}, {
                withCredentials: true
            });

            if(res.status === 200){
                toast.dismiss(id);
                toast.success("Item Posting Approved");
            }
            //console.log(res);
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
            setPopupVisible(false);
        }
    }

    const rejectPosting = async (post) => {
        let id;

        try {
            id = toast.loading("Processing. . . ");
            const res = await axios.delete(`http://localhost:8080/admin/reject-posting?college=${encodeURIComponent(post.college)}&foundBy=${encodeURIComponent(post.foundBy)}&id=${post.id}&email=${encodeURIComponent(post.email)}`, {
                withCredentials: true
            });

            if(res.status === 200){
                toast.dismiss(id);
                toast.success("Item Posting Rejected");
            }
            console.log(res);
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
            setPopupVisible(false);
        }
    }

    const handleSearch = () => {
        if(!searchTerm){
            toast.error("Please enter search term");
            return;
        }

        const filtered = allPosting.filter((post)=> {
            if(post.itemName.includes(searchTerm)){
                return post
            }
        });

        setFilteredPosting(filtered);
    }

    return (
        <>
            <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div>

            <div className={`${verified ? "block" : "hidden"} relative overflow-hidden bg-black min-h-screen flex flex-col justify-start items-center w-full`}>
                <MenuBarAdmin />

                {/* popup box */}
                <div className={`${popupVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all duration-500 ease-in-out bg-black/70 flex justify-center items-start pt-32 h-full w-full absolute`}>
                    <div className={`w-[90%] md:w-1/2 h-auto pt-2 pb-5 px-3 flex flex-col lg:flex-row bg-white z-20 rounded-md lg:rounded-lg gap-4`}>
                        <div className="h-44 lg:h-auto w-full lg:w-1/2 rounded-md bg-teal-500 lg:rounded-lg overflow-hidden relative">
                            <img src={popupData?.itemImage} className="w-full h-full object-cover" />
                            <span className="absolute top-2 left-2 text-xl cursor-pointer bg-white text-black p-2 rounded-full" onClick={() => setPopupVisible(false)}><RxCross2 /></span>
                            <div className="w-full h-1/2 absolute bg-gradient-to-t from-black to-transparent bottom-0"></div>
                            <h1 className="w-full absolute text-white font-Montserrat bottom-3 px-5 text-lg font-semibold">{popupData?.itemName}</h1>
                        </div>

                        <div className="w-full h-auto lg:w-1/2 flex flex-col justify-start items-start">
                            <p className="w-full text-start font-Montserrat text-[12px] bg-gray-200 rounded-md px-3 py-2 mt-2">{popupData?.itemDescription}</p>
                            <p className="w-full text-start font-Montserrat text-sm mt-2">Found By : {popupData?.foundBy}</p>
                            <p className="w-full text-start font-Montserrat text-sm mt-2">Found At : {popupData?.foundAt}</p>
                            <p className="w-full text-start font-Montserrat text-sm mt-2 capitalize">Category : {popupData?.itemCategory}</p>
                            <p className="w-full text-start font-Montserrat text-sm mt-2">Contact : {popupData?.contact}</p>
                            <p className="w-full text-start font-Montserrat text-sm mt-2">Email : {popupData?.email}</p>

                            <div className={`${popupData?.verified === false ? "block" : "hidden"} w-full mt-2 flex justify-between items-center gap-3`}>
                                <p className="w-full text-center py-2 rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out bg-blue-600 text-white" onClick={() => acceptPosting(popupData)}>Accept</p>
                                <p className="w-full text-center py-2 rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out bg-red-500 text-white" onClick={() => rejectPosting(popupData)}>Reject</p>
                            </div>
                            {/* <p className={`${popupData?.verified === false ? "hidden" : "block"} ${popupData?.ownerFound === true ? "hidden" : "block"}  mt-2 font-Montserrat w-full rounded-md py-2 text-center bg-green-500 cursor-pointer`}>Settle Claim</p> */}
                            <p className={`${popupData?.ownerFound === true ? "block" : "hidden"} w-full text-center mt-2 text-green-500 font-semibold font-Montserrat`}>Handed Over To Owner ✓</p>

                        </div>
                    </div>
                </div>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-5 text-center text-white font-Montserrat'>Welcome {name}</h1>

                <hr className="w-[90%] h-[2px] bg-zinc-800" />

                <div className={`w-full md:w-[60%] mt-4 mb-2 lg:w-[40%] px-4 py-3 flex justify-between items-center gap-3`}>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className={`w-full rounded-full bg-zinc-800 outline-none py-2 px-3 text-white placeholder-gray-400 font-Montserrat`} placeholder="Enter search term" />
                    <span onClick={handleSearch} className="p-2 rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-green-500 cursor-pointer"><IoSearchSharp /></span>
                </div>

                <div className="w-[90%] my-5 md:w-[50%] lg:w-[40%] flex justify-between items-center gap-3">
                    <p className={`${option === 'active' ? "bg-white text-black" : "bg-black text-white"} font-Montserrat py-2 cursor-pointer hover:opacity-75 duration-150 ease-in-out w-full text-center rounded-md text-[12px] md:text-sm`} onClick={() => setOption('active')}>Active</p>
                    <p className={`${option === 'pending' ? "bg-white text-black" : "bg-black text-white"} font-Montserrat py-2 cursor-pointer hover:opacity-75 duration-150 ease-in-out w-full text-center rounded-md text-[12px] md:text-sm`} onClick={() => setOption('pending')}>Pending</p>
                    <p className={`${option === 'settled' ? "bg-white text-black" : "bg-black text-white"} font-Montserrat py-2 cursor-pointer hover:opacity-75 duration-150 ease-in-out w-full text-center rounded-md text-[12px] md:text-sm`} onClick={() => setOption('settled')}>Owner Found</p>
                </div>

                <div className="w-full h-auto py-5 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                    {filteredPosting.map((post, index) => {
                        return <div key={index} className={`w-full cursor-pointer h-auto pt-2 flex flex-col justify-start items-center pb-4 px-3 rounded-md bg-zinc-800`} onClick={() => { setPopupVisible(!popupVisible); setPopupData(post) }}>
                            <div className="h-32 lg:h-52 w-full rounded-md bg-orange-400 overflow-hidden">
                                <img src={post.itemImage} className="h-full w-full object-cover" />
                            </div>
                            <p className="w-full text-start text-white font-Montserrat mt-3 text-sm">Name : {truncate(post.itemName)}</p>
                            <p className="w-full text-start text-white font-Montserrat py-1 text-sm capitalize">Category : {truncate(post.itemCategory)}</p>
                            <p className="w-full text-start text-white font-Montserrat py-1 text-sm">Found By : {truncate(post.foundBy)}</p>
                            <p className="w-full text-start text-white font-Montserrat py-1 text-sm">Found At : {truncate(post.foundAt)}</p>
                        </div>
                    })}
                </div>


                <div className={`w-full ${filteredPosting.length > 4 ? "h-56" : "h-[40vh]"}`}></div>

                <Footer />
            </div>
        </>
    )
}

export default AdminDashboard
