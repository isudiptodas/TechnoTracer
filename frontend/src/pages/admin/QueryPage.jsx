import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import loading from '../../assets/loading.gif'
import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";

function QueryPage() {

    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const[replyVisible, setReplyVisible] = useState(false);
    const [college, setCollege] = useState('');
    const[currentQuery, setCurrentQuery] = useState(null);
    const[option, setOption] = useState('pending');
    const[message, setMessage] = useState('');
    const[allQueries, setAllQueries] = useState([]);
    const[filteredQueries, setFilteredQueries] = useState([]);


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
              
                setCollege(res.data.college);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    useEffect(()=> {
        const fetchQueries = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/fetch/all-queries?college=${encodeURIComponent(college)}`, {
                    withCredentials: true
                });

                //console.log(res.data);
                setAllQueries(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchQueries();
    }, [college]);

    const sendReply = async () => {
        if(!message){
            toast.error("Message is empty");
            return;
        }

        let id;
        try {
            id = toast.loading("Sending reply . . .");
            const res = await axios.post(`http://localhost:8080/admin/reply-query`, {
                message: message,
                to: currentQuery?.email,
                college: currentQuery?.college,
                queryTitle: currentQuery?.queryTitle,
                id: currentQuery?.id,
                username: currentQuery?.username
            }, {
                withCredentials: true
            });

            if(res.status === 200){
                toast.dismiss(id);
                toast.success("Reply sent");
                setCurrentQuery(null);
                setReplyVisible(false);
            }
        } catch (err) {
            if(err?.response?.data){
                toast.error(err.response.data);
            }
            else{
                toast.error("Something went wrong");
            }
        }
    }

    useEffect(() => {
        const filterQuery = () => {
            if(option === 'pending'){
                const filtered = allQueries.filter((query) => {
                    return query.solved === false;
                });
                //console.log(filtered);
                setFilteredQueries(filtered);
            }
            else if(option === 'solved'){
                const filtered = allQueries.filter((query) => {
                    return query.solved === true;
                });
                //console.log(filtered);
                setFilteredQueries(filtered);
            }
        }

        filterQuery();
    }, [option]);

    return (
        <>
            <div className={`${verified ? "hidden" : "block"} h-screen w-full bg-black flex justify-center items-center`}>
                <img src={loading} />
            </div>

            <div className={`${verified ? "block" : "hidden"} bg-black min-h-screen flex flex-col relative justify-start items-center overflow-hidden w-full`}>
                <MenuBarAdmin />

                {/* reply box */}
                <div className={`${replyVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all duration-500 ease-in-out w-full h-full absolute z-20 flex justify-center items-start bg-black/80 pt-32`}>
                    <div className="w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center gap-3 py-3 px-3 rounded-md lg:rounded-lg bg-white">
                        <p className={`w-full text-start tex-[12px] lg:text-sm font-Montserrat`}>Hello {currentQuery?.username}</p>
                        <p className={`w-full text-start tex-[12px] lg:text-sm font-Montserrat`}>This mail is regarding your recent query on Technotracer titled :  {currentQuery?.queryTitle}</p>
                        <p className={`w-full text-start tex-[12px] lg:text-sm font-Montserrat`}>Thank you for your patience.</p>
                        <textarea onChange={(e) => setMessage(e.target.value)} className="w-full h-48 bg-gray-200 rounded-md outline-none py-2 px-3 text-black" placeholder="Enter your message"/>
                        <p className={`w-full text-start tex-[12px] lg:text-sm font-Montserrat`}>Best regards, </p>
                        <p className={`w-full text-start tex-[12px] lg:text-sm font-Montserrat`}>Admin : {currentQuery?.college}</p>

                        
                        <p onClick={sendReply} className={`w-full bg-blue-500 text-white flex justify-center items-center gap-3 cursor-pointer hover:opacity-80 ease-in-out duration-150 py-2 rounded-md lg:rounded-lg `}>Send <IoMdSend/></p>
                        <p onClick={() => {setReplyVisible(false); setCurrentQuery(null);}} className={`w-full bg-red-500 text-white flex justify-center items-center gap-3 cursor-pointer hover:opacity-80 ease-in-out duration-150 py-2 rounded-md lg:rounded-lg `}>Cancel</p>
                    </div>
                </div>

                <h1 className='w-full text-xl font-semibold sm:text-4xl mt-5 mb-10 text-center text-white font-Montserrat'>User Queries</h1>

                <div className={`w-auto flex justify-between items-center gap-3 py-2`}>
                    <p onClick={() => setOption('pending')} className={`${option === 'pending' ? "bg-white text-black" : "bg-transparent text-white"} font-Montserrat text-sm px-3 py-2 rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out`}>Pending</p>
                    <p onClick={() => setOption('solved')} className={`${option === 'solved' ? "bg-white text-black" : "bg-transparent text-white"} font-Montserrat text-sm px-3 py-2 rounded-md cursor-pointer hover:opacity-75 duration-150 ease-in-out`}>Replied</p>
                </div>

                <hr className="w-[90%] h-[1px] bg-zinc-600 my-5"/>

                <div className={`w-full h-auto py-5 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3`}>
                    {filteredQueries.length > 0 && filteredQueries.map((query, index)=> {
                        return <div key={index} className={`w-full h-auto py-4 px-3 rounded-md bg-zinc-800 flex flex-col justify-start items-start`}>
                            <p className="text-white font-Montserrat text-lg font-semibold">{query.queryTitle}</p>
                            <p className="text-white font-Montserrat text-sm">{query.message}</p>

                            <p className="text-white font-Montserrat text-[12px] mt-4 opacity-80">{query.username}</p>
                            <p className="text-white font-Montserrat text-[12px] opacity-80">{query.college}</p>
                            <p className="text-white font-Montserrat text-[12px] opacity-80">{query.email}</p>
                            <p className={`${query.solved === true ? "hidden" : "block"} w-full flex justify-center items-center gap-2 rounded-md cursor-pointer bg-blue-500 text-white font-Montserrat py-2 mt-4`} onClick={() => {setCurrentQuery(query); setReplyVisible(true);}}>Send reply <IoMdSend/></p>
                        </div>
                    })}
                </div>

                <div className="w-full h-[70vh]"></div>

                <Footer />
            </div>
        </>
    )
}

export default QueryPage
