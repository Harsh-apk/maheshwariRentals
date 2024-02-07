import { useState } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({setUser}) => {
    const [email,setEmail] = useState("email@example.com");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [pending,setPending] = useState(false);
    const history = useHistory();

    const handleSubmit = async(e)=>{
        setError(null);
        e.preventDefault();
        // const url = "http://127.0.0.1:5000/login";
        const url = "/login";
        const body = {email,password};
        setPending(true);
        try {
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body),
                redirect:"follow"
            });
            if (!res.ok){
                throw new Error("Something went wrong 😢")
            }
            const response = await res.json();
            if(response.error){
                throw new Error(response.error);
            }
            setUser(response);
            history.push("/")

        }catch (err){
            setError(err.message);
            return;
        }finally{
            setPending(false);
        }


    }



    return ( <div className=" m-20 md:m-32" >

            {error && <div className=" text-center text-red-600 p-2 " >{error}</div>}
            {pending && <div className=" text-center text-red-600 p-2 " >Loading...</div>}
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-2 font-bold text-xl flex justify-center" ><label>Email</label></div>
                <div className="flex justify-center" ><input className="m-2 p-2  border border-yellow-500 rounded-xl text-center " type="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} /></div>
                <div className="m-2 p-2 font-bold text-xl flex justify-center"><label>Password</label></div>
                <div className=" flex justify-center " ><input className="m-2 p-2 border border-yellow-500 rounded-xl text-center " type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} /></div>
                <div className="flex justify-center m-4 p-2 " ><button className="text-xl shadow-xl  hover:text-white bg-yellow-500 px-2 py-1 rounded-xl " > Login </button></div>
            </form>
            <div className="text-center mt-10 " >
                <div className="text-xs" >Don't have an account?</div>
                <Link to="/signup" className="flex justify-center p-2 " ><button className="text-xl shadow-xl hover:text-white bg-yellow-500 py-1 px-2 rounded-xl " > Sign Up </button></Link>
            </div>
        </div> );
}
 
export default Login;