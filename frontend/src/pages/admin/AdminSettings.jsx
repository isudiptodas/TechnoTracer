import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import MenuBarAdmin from "../../components/MenuBarAdmin"
import { useNavigate } from "react-router-dom"
import loading from '../../assets/loading.gif';
import axios from "axios";
import { toast } from "sonner";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

function AdminSettings() {

    const [verified, setVerified] = useState(false);
    const [name, setName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [college, setCollege] = useState('');
    const [email, setEmail] = useState('');
    const [current, setCurrent] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

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
                
                setName(res.data.name);
                setUserDetails(res.data);
                setContact(res.data.contact);
                setCollege(res.data.college);
                setEmail(res.data.email);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    const updateProfile = async () => {
        if(!name || !email || !contact){
            toast.error("Empty fields not allowed");
            return;
        }

        let id;

        try {
            id = toast.loading("Updating . . .");
            const res = await axios.put(`http://localhost:8080/admin/update-profile?currentEmail=${encodeURIComponent(userDetails.email)}`, {
                email: email || userDetails.email,
                contact: contact || userDetails.contact,
                name: name || userDetails.name
            }, {
                withCredentials: true
            });
            
            if(res.status === 200){
                toast.success("Profile Updated");
                setTimeout(()=> {
                    navigate('/admin/dashboard');
                }, 2000);
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
        }
    }

    const changePassword = async () => {
        if(!current || !newPassword){
            toast.error("Empty fields not allowed");
            return;
        }

        if(newPassword.length <= 7){
            toast.error("Password length must be 8 or more");
            return;
        }

        let id;

        try {
            id = toast.loading("Changing . . .");
            const res = await axios.put(`http://localhost:8080/admin/change-password?email=${encodeURIComponent(userDetails.email)}&newPassword=${encodeURIComponent(newPassword)}&current=${encodeURIComponent(current)}`, {}, {
                withCredentials: true
            });
            
            if(res.status === 200){
                toast.success("Password changed");
                setTimeout(()=> {
                    navigate('/admin/dashboard');
                }, 2000);
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
        }
    }

    return (
        <>
            <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div>

            <div className={`${verified ? "block" : "hidden"} w-full min-h-screen bg-black flex flex-col justify-start items-center relative overflow-hidden`}>

                <MenuBarAdmin />

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Admin Settings</h1>

                <div className='w-full my-5 md:w-[70%] lg:w-[40%] py-4 px-4 flex flex-col justify-start items-center gap-3 relative'>

                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update name' />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update email' />
                    <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" className='w-full rounded-md py-2 px-3 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Update contact' />

                    <p className='w-full py-2 lg:py-3 text-center bg-white text-black capitalize rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out font-Montserrat my-2 font-semibold active:scale-95 flex justify-center items-center gap-2' onClick={updateProfile}>Update profile <FaUserCheck /></p>

                    <div className='w-full h-auto py-2 flex flex-col justify-center items-center gap-2 relative'>
                        <input onChange={(e) => setCurrent(e.target.value)} value={current} type={passwordVisible ? "text" : "password"} className='w-full mt-5 rounded-md py-2 px-3 pr-10 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Enter current password' />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className='absolute text-white cursor-pointer opacity-55 top-10 right-5'>{passwordVisible ? <FaEye /> : <FaEyeSlash />}</span>

                        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={passwordVisible ? "text" : "password"} className='w-full rounded-md py-2 px-3 pr-10 outline-none bg-zinc-800 text-white placeholder-gray-300' placeholder='Enter new password' />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className='absolute text-white cursor-pointer opacity-55 top-[90px] right-5'>{passwordVisible ? <FaEye /> : <FaEyeSlash />}</span>

                        <p className='w-full py-2 lg:py-3 text-center bg-white text-black capitalize rounded-md cursor-pointer hover:opacity-70 duration-200 ease-in-out font-Montserrat my-2 font-semibold active:scale-95 flex justify-center items-center gap-2' onClick={changePassword}>Update Password <FaLock /></p>
                    </div>
                </div>

                <div className="w-full h-[60vh]"></div>
                <Footer />
            </div>
        </>
    )
}

export default AdminSettings
