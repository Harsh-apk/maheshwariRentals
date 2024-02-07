import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Posts from "./Posts";
import Bottom from "./Bottom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Account = ({user,setUser}) => {
    const history = useHistory();
    const handleLogout = ()=>{
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
        setUser(null);
        history.push("/");
    }
    if(user===null){
        history.push("/");
    }
    return ( 
        <div>
        <div className="my-10 mx-4 border border-yellow-500 flex justify-around shadow-2xl p-2 rounded-2xl items-center " >
            <span className="m-2  text-xs md:text-lg" >
                <div className="font-bold" >My Account</div>
                <div>Name : {user.name}</div>
                <div>Email : {user.email}</div>
                <div>Phone : {user.phone}</div>
                <div className="mt-2" ><button className=" bg-yellow-500 p-1 hover:text-white rounded-lg " onClick={handleLogout} >Log Out</button></div>
            </span>
            <span className="m-2" >
                <img className="h-28 md:h-40 rounded-full aspect-square shadow-2xl border border-yellow-500 " src={user.profile} alt="profile pic" />
            </span>
        </div>
        <Link to="/create" ><div className="flex justify-center mb-5 "><span className=" flex pb-0.5 px-3 items-center text-center text-4xl hover:text-white bg-yellow-500  rounded-full" >+</span></div></Link>
        <Posts/>
        <Bottom/>
        </div>
     );
}
 
export default Account;