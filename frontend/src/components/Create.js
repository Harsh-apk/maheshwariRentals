import { useState,useEffect } from "react";
import Bottom from "./Bottom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

        

const Create = ({setPostId}) => {
    const history = useHistory();
    const [loc,setLoc] = useState(null);
    const [pending,setPending] = useState(false);
    const [error,setError] = useState(null);
    const [state,setState] = useState(null);
    useEffect(()=>{
        if(loc===null){
            setPending(true);
            setError(null);
            // const uri = "http://127.0.0.1:5000/locJson/loc.json";
            const uri = "/locJson/loc.json";
            const getData = async()=>{
                try{
                    const res = await fetch(uri);
                    if(!res.ok){
                        throw new Error("Something went wrong 🥲")
                    }
                    const response = await res.json();
                    setLoc(response);
                }catch(err){
                    setError(err.message);
                }finally{
                    setPending(false);
                }
            }
            getData();
        }
    },[loc]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // const url = "http://127.0.0.1:5000/api/v1/post";
        const url = "/api/v1/post";
        setPending(true);
        setError(null);
        try{
            const res = await fetch(url,{
                method:'POST',
                body:formData,
                redirect:"follow"
            });
            if(!res.ok){
                throw new Error("Something went wrog 🥲")
            }
            const response = await res.json();
            if(response.error){
                throw new Error(response.error)
            }
            setPostId(response.id)
            history.push("/uploadImages")
        }catch(err){
            setError(err.message);
        }finally{
            setPending(false);
        }
    }
    return ( 
        <div className="mb-32 mt-12" >
        <div className="text-2xl font-bold p-5 text-center " >Post New Ad</div>
        {pending && <div className="text-center text-xl text-red-500 p-2" >Loading...</div>}
        {error && <div className="text-center text-xl text-red-500 p-2" >{error}</div>}
        {loc && (
        <form className=" md:mx-32 "onSubmit={handleSubmit}>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
            <label>Title</label>
            <input required type="text" name="title" className="border border-yellow-500 rounded-xl p-3"/>
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
            <label >Type</label>
            <select required name="type" className="border border-yellow-500 rounded-xl p-3">
               <option value={"Single Room"} >Single Room</option>
               <option value={"PG"} >PG</option>
               <option value={"1 BHK"} >1 BHK</option>
               <option value={"2 BHK"} >2 BHK</option>
               <option value={"3 BHK"} >3 BHK</option>
               <option value={"4 BHK"} >4 BHK</option>
            </select>
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
                <label>Rent</label>
                <input type="text" name="rent" required className="border border-yellow-500 rounded-xl p-3"/>
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
                <label>Description</label>
                <textarea required name="description" className="border border-yellow-500 rounded-xl p-3" />
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
            <label>State</label>
            <select required name="state" onChange={(e)=>(setState(e.target.value))} className="border border-yellow-500 rounded-xl p-3">
                {(loc.state).map((place)=>(
                    <option key={place.id} value={place.name}  >{place.name}</option>
                ))}
            </select>
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
            <label>City</label>
            <select required name="city" className="border border-yellow-500 rounded-xl p-3">
                {!state &&(<option value="">Please select the state first</option>)}
                { state && ((loc[state]).map((city)=>(
                    <option key={city.id} value={city.name} >{city.name}</option>
                )))}
            </select>
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
                <label>Area</label>
                <input type="text" required name="area" className="border border-yellow-500 rounded-xl p-3" />
            </div>
            <div className="flex justify-around p-3 m-3 border-2 text-xl items-center ">
                <label>Address</label>
                <input type="text" required name="address" className="border border-yellow-500 rounded-xl p-3" />
            </div>
            <div className="flex justify-around p-3 m-3 text-xl items-center " >
                <button className="px-5 py-2 bg-yellow-500 rounded-xl font-bold hover:text-white " >Post</button>
            </div>
        </form>
        )}
        
        <Bottom/>
        </div>
     );
}
 
export default Create;





