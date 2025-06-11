import axios from 'axios';
import loading from '../../assets/loading.gif';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { states } from '../../data/states';
import { HiOutlineExternalLink } from "react-icons/hi";
import Footer from '../../components/Footer';
import { MdVerified } from "react-icons/md";

function SuperDashboard() {

    const [verified, setVerified] = useState(false);
    const [stateVisible, setStateVisible] = useState(false);
    const [collegeVisible, setCollegeVisible] = useState(false);
    const navigate = useNavigate();
    const[status, setStatus] = useState(false);
    const [state, setState] = useState('select state');
    const [college, setCollege] = useState('select college');
    const [admins, setAdmins] = useState([]);
    const [allCollege, setAllCollege] = useState([]);

    useEffect(() => {
        const verifySuper = async () => {
            try {
                const res = await axios.get('http://localhost:8080/super/verify', {
                    withCredentials: true
                });

                //console.log(res);

                if (res.data === true) {
                    setVerified(true);
                }
                else {
                    // navigate('/');
                }
            } catch (err) {
                console.log(err);
                //navigate('/');
            }
        }

        //verifySuper();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //console.log(document.cookie);

                const res = await axios.get('http://localhost:8080/super/details', {
                    withCredentials: true
                });

                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        //fetchUser();
    }, []);

    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:8080/user/logout', {}, {
                withCredentials: true
            });

            //console.log(res.data);

        } catch (err) {
            toast.error(err?.response?.data);
            console.log(err.message);
        }
        // finally{
        //     navigate('/');
        // }
    }

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/super/fetch-admins`, {
                    withCredentials: true
                });

                //console.log(res.data);
                
                setAdmins(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAdmin();
    }, []);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/get/colleges?state=${encodeURIComponent(state)}`);

                //console.log(res);
                setAllCollege(res.data);
            } catch (err) {

            }
        }

        fetchColleges();
    }, [state]);

    useEffect(()=> {
        const filterAdminByState = () => {
            const filter = admins.filter((adm)=> {
                return adm.state === state
            });

            setAdmins(filter);
            //console.log(filter);
        }

        filterAdminByState();
    }, [state]);

    useEffect(()=> {
        const filterAdminByCollege = () => {
            const filter = admins.filter((adm)=> {
                return adm.college === college
            });

            setAdmins(filter);
            //console.log(filter);
        }

        filterAdminByCollege();
    }, [college]);

    const verifyAdmin = async (email) => {

        let id;

        try {
            id = toast.loading("Processing...");
            const res = await axios.put(`http://localhost:8080/super/verify-admin?email=${encodeURIComponent(email)}` );

            //console.log(res);

            if(res.status === 200){
                toast.success("Admin verified");
            }
        } catch (err) {
            if(err?.response?.data){
                toast.error(err.response.data)
            }
            else{
                toast.error("Something went wrong");
            }
        }
        finally{
            toast.dismiss(id);
        }
    }

    const rejectAdmin = async (email) => {

        let id;

        try {
            id = toast.loading("Processing...");
            const res = await axios.delete(`http://localhost:8080/super/reject-admin?email=${encodeURIComponent(email)}` );

            //console.log(res);

            if(res.status === 200){
                toast.success("Application rejected");
            }
        } catch (err) {
            if(err?.response?.data){
                toast.error(err.response.data)
            }
            else{
                toast.error("Something went wrong");
            }
        }
        finally{
            toast.dismiss(id);
        }
    }


    return (
        <>
            {/* <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div> */}

            <div className={`${verified ? "block" : "block"} w-full min-h-screen bg-black flex flex-col justify-start items-center pt-5 overflow-hidden relative`}>
                <h1 className="w-full flex justify-center items-center py-5 lg:py-12 z-30 text-white font-DuneRise text-[10px] md:text-sm cursor-pointer hover:scale-110 hover:font-bold duration-200 ease-in-out">TECHNOTRACER</h1>

                <p className='w-auto px-4 py-1 rounded-full bg-red-500 text-white font-Montserrat cursor-pointer hover:opacity-60 duration-200 ease-in-out' onClick={logout}>Logout</p>

                <div className='w-full md:w-[50%] flex relative flex-col md:flex-row justify-start items-center gap-4 py-2 px-5 mt-5'>
                    <p className='w-full rounded-md lg:rounded-lg bg-white text-black font-Montserrat text-sm capitalize cursor-pointer py-2 md:py-3 text-center' onClick={() => {setStateVisible(!stateVisible);}}>{state}</p>
                    <div className={`${stateVisible ? "block" : "hidden"} w-[90%] md:w-[45%] md:left-5 top-14 flex flex-col justify-start items-start gap-2 bg-white absolute py-2 px-2 rounded-md h-52 overflow-y-auto`}>
                         {states.map((st, index)=> {
                            return <span key={index} className='w-full py-2 px-2 capitalize hover:bg-gray-300 duration-150 ease-in-out cursor-pointer' onClick={() => {setState(st); setStateVisible(false);}}>{st}</span>
                         })}
                    </div>

                    <p className='w-full rounded-md lg:rounded-lg bg-white text-black font-Montserrat text-sm capitalize cursor-pointer py-2 md:py-3 text-center' onClick={() => {setCollegeVisible(!collegeVisible);}}>{college}</p>
                    <div className={`${collegeVisible ? "block" : "hidden"} w-[90%] md:w-[45%] md:right-5 md:top-14 top-28 flex flex-col justify-start items-start gap-2 bg-white absolute py-2 px-2 rounded-md max-h-44 overflow-y-auto`}>
                        {allCollege.map((col, index)=> {
                            return <span key={index} className='w-full py-2 px-2 capitalize hover:bg-gray-300 duration-150 ease-in-out cursor-pointer' onClick={() => {setCollege(col); setCollegeVisible(false);}}>{col}</span>
                         })}
                    </div>
                </div>
                <div className='w-full my-5 flex justify-center items-center gap-3'>
                    <p className='text-white font-Montserrat text-sm'>Status : <span className='px-4 py-1 rounded-md lg:rounded-lg bg-white text-black cursor-pointer capitalize' onClick={() => setStatus(!status)}>{status ? "Verified" : "pending"}</span></p>
                    <p></p>
                </div>

                <h1 className='text-white font-Montserrat w-full text-center py-5 text-2xl font-semibold'>Admin List</h1>

                <div className={`w-full px-4 lg:px-10 py-5 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-3`}>
                        {admins.length > 0 && admins.map((admin, index) => {
                            return <div key={index} className={` w-full h-auto rounded-md lg:rounded-lg bg-zinc-800 px-3 py-5 lg:px-5 flex flex-col justify-start items-start gap-2`}>
                                <p className='text-white font-Montserrat text-sm'>Name : <span>{admin.name}</span></p>
                                <p className='text-white font-Montserrat text-sm'>Email : <span>{admin.email}</span></p>
                                <p className='text-white font-Montserrat text-sm'>Contact : <span>{admin.contact}</span></p>
                                <p className='text-white font-Montserrat text-sm'>College : <span>{admin.college}</span></p>
                                <p className='text-white font-Montserrat text-sm'>State : <span className='capitalize'>{admin.state}</span></p>
                                <p className={`${admin.verified ? "hidden" : "block"} text-blue-300 font-Montserrat text-sm my-2 rounded-full flex justify-center items-center gap-2 cursor-pointer`} onClick={() => window.open(admin.adminProof, '_blank')}>Verification <HiOutlineExternalLink /></p>
                                <p className={`${admin.verified ? "block" : "hidden"} text-blue-300 font-Montserrat text-sm my-2 rounded-full flex justify-center items-center gap-2 cursor-pointer`}>Verified <MdVerified /></p>
                                <div className={`${admin.verified ? "hidden" : "block"} w-full flex justify-between items-center gap-3`}>
                                    <p onClick={() => verifyAdmin(admin.email)} className='w-full py-2 text-center bg-blue-600 text-white hover:opacity-75 duration-150 ease-in-out font-Montserrat text-sm cursor-pointer rounded-md'>Verify</p>
                                    <p onClick={() => rejectAdmin(admin.email)} className='w-full py-2 text-center bg-red-600 text-white hover:opacity-75 duration-150 ease-in-out font-Montserrat text-sm cursor-pointer rounded-md'>Reject</p>
                                </div>
                            </div>
                        })}
 
                </div>

                <div className='w-full h-72 lg:h-52'></div>

                <Footer/>

            </div>
        </>
    )
}

export default SuperDashboard
