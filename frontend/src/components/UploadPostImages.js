import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Bottom from './Bottom'
import { useState } from 'react';
const UploadPostImages = ({postId}) => {
    const history = useHistory();
    const [pending,setPending] = useState(false);
    const [error,setError] = useState(null);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(pending){
            return;
        }
        setPending(true);
        setError(null);
        const formData = new FormData(e.currentTarget)
        // const url = "http://127.0.0.1:5000/api/v1/postImages";
        const url = "/api/v1/postImages";
        formData.append("id",postId);
        try{
            const res = await fetch(url,{
                method:'POST',
                body:formData,
                redirect:'follow'
            });
            if(!res.ok){
                throw new Error("Something went wrong 🥲, please try again ")
            }
            const response = await res.json()
            if(response.error){
                throw new Error(response.error)
            }
            if(response.result === "success" ){
                history.push("/specificPost")
            }else{
                throw new Error("Something went wrong 🥲, please try again later !")
            }
        }catch(err){
            setError(err.message);
        }finally{
            setPending(false);
        }
    }

    return (
        <div className="mb-32 mt-12" >
            { error && (<div className=" text-center text-red-500 p-5 " >{error} </div>)}
            { pending && (<div className=" text-center text-red-500 p-5 " >Loading ... </div>)}
            <form onSubmit={handleSubmit} enctype="multipart/form-data" >
                <div className='m-5 p-5 text-center' ><label className='text-2xl font-bold' >Upload Images</label></div>
                <div className='m-5 p-5 flex justify-center' ><input className=' pl-10 py-5 md:pl-36 md:py-10 rounded-2xl  border border-yellow-500' required type="file" multiple name="postImages" accept="image/*" alt='upload Images' /></div>
                <div className='m-5 p-5 flex justify-center ' ><button className='p-3 bg-yellow-500 rounded-xl font-bold hover:text-white' >Submit</button></div>
            </form>
            <Bottom />
        </div>
     );
}
 
export default UploadPostImages;