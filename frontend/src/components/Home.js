import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Bottom from "./Bottom";
import Search from "./Search";

const Home = ({ user, setUser }) => {
  const [pending, setPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user === null) {
      // const url = "http://127.0.0.1:5000/api/v1/home";
      const url = "/api/v1/home";
      const getData = async () => {
        setPending(true);
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Something went wrong 😢");
          }
          const response = await res.json();
          if (response.error) {
            throw new Error(response.error);
          }
          setUser(response);
        } catch (err) {
         history.push("/login");
        } finally {
          setPending(false);
        }
      };
      getData();
    }
  },[user]);

  return (
    <div>
      {pending && (
        <div className="text-red-500 text-center p-2">Pending...</div>
      )}
      <Search/>
      <Bottom />
      
    </div>
  );
};

export default Home;
