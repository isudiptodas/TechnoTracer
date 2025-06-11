import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import MenuBar from "../../components/MenuBar"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loading from '../../assets/loading.gif';
import { IoMdSend } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";

function ContactAdmin() {

    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [query, setQuery] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [college, setCollege] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/user/details', {
                    withCredentials: true
                });

                setCollege(res.data.college);
                setEmail(res.data.email);
                setName(res.data.username);
                //console.log(res.data.college);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

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

    const sendMessage = async () => {
        if(!query || !message){
            toast.error("All fields are required");
            return;
        }

        let id;

        try {
            id = toast.loading("Sending message");
            const res = await axios.post(`http://localhost:8080/user/admin-contact`, {
                queryTitle: query,
                message: message,
                username: name,
                email: email,
                college: college
            }, {
                withCredentials: true
            });

            //console.log(res);

            if(res.status === 200){
                toast.success("Message sent");
                setTimeout(()=> {
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

            <div className={`w-full min-h-screen bg-black flex flex-col justify-start items-center overflow-hidden`}>
                <MenuBar />

                <span onClick={goBack} className="flex z-40 cursor-pointer justify-center items-center gap-2 text-lg font-Montserrat absolute top-20 left-5 text-white"><IoIosArrowRoundBack className="text-2xl lg:text-3xl" /></span>


                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>Send Query to Admin</h1>

                <div className={`w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] h-auto flex flex-col justify-start items-center px-3 py-3 gap-3`}>
                    <input onChange={(e) => setQuery(e.target.value)} type="text" className="w-full bg-zinc-800 rounded-md py-2 px-3 text-white outline-none" placeholder="Enter query title" />
                    <textarea onChange={(e) => setMessage(e.target.value)} className="w-full h-52 bg-zinc-800 rounded-md px-3 py-2 outline-none text-white" placeholder="Enter your message" />
                    <p className="w-full py-2 text-center flex justify-center items-center gap-2 rounded-md bg-white text-black cursor-pointer hover:opacity-75 duration-150 ease-in-out" onClick={sendMessage}>Send <IoMdSend /></p>
                </div>

                <div className={`h-[40vh] w-full`}></div>
                <Footer />
            </div>

        </>
    )
}

export default ContactAdmin
