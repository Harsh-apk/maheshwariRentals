import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Signup = ({setUser}) => {
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState(null);
    const [pending,setPending] = useState(false);
    const [error,setError] = useState(null);
    const history = useHistory();

    const handleClick = async(e)=>{
            // const url = "http://127.0.0.1:5000/signup";
            e.preventDefault();
            if(pending){
                return;
            }
            setPending(true);
            setError(null);
            const url = "/signup";
            let body = {email,name,password};
            if(phone){
                body = Object.assign({phone});
            }
            try{
                const res = await fetch(url,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(body),
                    redirect:"follow"
                });
                if(!res.ok){
                    throw new Error("Something went wrong 😢")
                }
                const response = await res.json();
                if(response.error){
                    throw new Error(response.error);
                }
                setUser(response);
                history.push("/");
            }catch(err){
                setError(err.message);
            }finally{
                setPending(false);
            }


    }

    return ( 
        <div className="m-10 md:m-32" >
            {pending && <div className="text-center text-xl text-red-500 p-2" >Loading...</div>}
            {error && <div className="text-center text-xl text-red-500 p-2" >{error}</div>}
            <form onSubmit={handleClick} >
                <div className="flex justify-center my-5 items-center " >
                <label className=" mx-3 " >Email</label>
                <input type="email" className="border border-yellow-500 p-2 rounded-xl " required onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="flex justify-center my-5 items-center " >
                <label className=" mx-3 " >Name</label>
                <input type="text" className="border border-yellow-500 p-2 rounded-xl " required onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="flex justify-center my-5 items-center " >
                <label className=" mx-3 " >Phone</label>
                <input type="text" className="border border-yellow-500 p-2 rounded-xl " onChange={(e)=>{setPhone(e.target.value)}} />
                </div>
                <div className="flex justify-center my-5 items-center " >
                <label className=" mx-3 " >Password</label>
                <input type="password" className="border border-yellow-500 p-2 rounded-xl mr-5 " required onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div className="flex justify-center m-4 p-2 " ><button className="text-xl shadow-xl  hover:text-white bg-yellow-500 px-2 py-1 rounded-xl " > Signup </button></div>


            </form>
        </div>
     );
}
 
export default Signup;