import { useState,useEffect } from "react";
import Bottom from "./Bottom";

const Posts = () => {
    const [pending,setPending] = useState(false);
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(data===null){
            setPending(true);
            setError(null);
            const getData = async()=>{
                // const url = "http://127.0.0.1:5000/api/v1/accountposts";
                const url = "/api/v1/accountposts";
                try{
                    const res =  await fetch(url);
                    if(!res.ok){
                        throw new Error("Something went wrong 🥲")
                    }
                    const response = await res.json();
                    if(response.error){
                        throw new Error(response.Error);
                    }
                    setData(response);
                }catch(err){
                    setError(err.message);
                }finally{
                    setPending(false);
                }
            }
            getData();
        }
    },[data])

    return ( 
        <div className="m-2" >
            <div className="p-5 m-2 text-center font-bold text-2xl" >My Ads</div>
            {pending && <div className="p-2 text-center text-red-500" >Loading ...</div>}
            {error && <div className="p-2 text-center text-red-500" >{error}</div>}
            {data && (data.data) && 
                (data.data).map((post)=>(
                    <div className="my-10 mx-3 p-3 shadow-2xl rounded-2xl border border-yellow-500 "  key={post.id} >
                    <div className=" text-lg md:text-2xl font-bold p-1" >{post.title}</div>
                    <div className="text-lg md:text-2xl font-bold flex justify-between p-1 " >
                    <span>{post.type}</span>
                    <span>₹{post.rent}</span>
                    </div>
                    <div className="p-1">Description : {post.description}</div>
                    <div className="p-1">Area : {post.area}</div>
                    <div className="p-1">City : {post.city}</div>
                    <div className="p-1">State : {post.state}</div>
                    <div className="p-1">Address : {post.address}</div>
                    </div>
                ))
            }
            <div className="m-20" ></div>
            <Bottom/>

        </div>
     );
}
 
export default Posts;