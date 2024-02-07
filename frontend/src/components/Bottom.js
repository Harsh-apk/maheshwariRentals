import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { HiMiniHome } from "react-icons/hi2";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdCollectionsBookmark } from "react-icons/md";


const Bottom = ({path}) => {
    
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white items-center border-t flex justify-around border-yellow-500 py-3  rounded-2xl">
      <Link to="/account"><RiAccountCircleFill size={28}  />
</Link>
      <Link to="/">
        <HiMiniHome size={28}/>
      </Link>
      <Link to="/saved" ><MdCollectionsBookmark size={28} /></Link>
    </div>
  );
};

export default Bottom;
