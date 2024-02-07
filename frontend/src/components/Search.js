import { useEffect, useState } from "react";

const Search = () => {
  const [type, setType] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [loc, setLoc] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (loc === null) {
      setPending(true);
      setError(null);
      // const uri = "http://127.0.0.1:5000/locJson/loc.json";
      const uri = "/locJson/loc.json";
      const getData = async () => {
        try {
          const res = await fetch(uri);
          if (!res.ok) {
            throw new Error("Something went wrong 🥲");
          }
          const response = await res.json();
          setLoc(response);
        } catch (err) {
          setError(err.message);
        } finally {
          setPending(false);
        }
      };
      getData();
    }
  }, [loc]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let filter = {};
    setError(null);
    if (city) {
      filter = Object.assign({ city: city });
    }
    if (state) {
      filter = Object.assign({ state: state });
    }
    if (type) {
      filter = Object.assign({ type: type });
    }
    if (Object.keys(filter).length === 0) {
      setError("Please add filters first");
      return;
    }
    const getData = async () => {
      // const uri = "http://127.0.0.1:5000/api/v1/search";
      const uri = "/api/v1/search";
      setPending(true);
      try {
        const res = await fetch(uri, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filter),
          redirect: "follow",
        });
        if (!res.ok) {
          throw new Error("Something went wrong 🥲");
        }
        const response = await res.json();
        if(response===null){
          throw new Error("No Ads found")
        }
        if (response.error) {
          throw new Error(response.error);
        }
        setPosts(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setPending(false);
      }
    };
    getData();
  };

  return (
    <div className="mt-5 mx-3 mb-3 md:my-16 md:mx-20">
      <div className="text-xl font-bold text-center " >Find Properties</div>
      {error && <div className="text-center mt-5 text-red-500 p-3">{error}</div>}
      {pending && (
        <div className="text-center text-red-500 p-3">Loading ...</div>
      )}
      <form className="mt-5 md:mt-10 border border-yellow-500 p-5 md:p-10 rounded-2xl shadow-2xl "   onSubmit={handleSubmit}>
        <div className="flex justify-around items-center" >
          <label className="pr-28" >Type</label>
          <select
          className=" p-1 border border-yellow-500 rounded-lg"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value={"Single Room"}>Single Room</option>
            <option value={"PG"}>PG</option>
            <option value={"1 BHK"}>1 BHK</option>
            <option value={"2 BHK"}>2 BHK</option>
            <option value={"3 BHK"}>3 BHK</option>
            <option value={"4 BHK"}>4 BHK</option>
          </select>
        </div>
          <div className="flex justify-around items-center mt-2 " >
            <label>State</label>
            <select className=" p-1 border border-yellow-500 rounded-lg" name="state" onChange={(e) => setState(e.target.value)}>
              {loc && loc.state.map((place) => (
                <option key={place.id} value={place.name}>{place.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-around items-center mt-2 " >
            <label>City</label>
            <select
            className=" p-1 border border-yellow-500 rounded-lg"
              name="city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {!state && (
                <option value="">Please select the state first</option>
              )}
              {state &&
                loc[state].map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-around items-center mt-5 md:mt-10 " >
            <button className="bg-yellow-500 font-bold hover:text-white rounded-xl p-2" >Search</button>
          </div>
      </form>
      <div className="mt-10 mb-32 " >
        {posts && <div className="text-center font-bold text-xl " >Search Results</div>}
        {posts && (
                posts.map((post)=>(
                    <div className=" mt-10 flex justify-around items-center border border-yellow-300 p-3 md:p-5 rounded-2xl " key={post.id} >
                      {post.postImages!=null && <span><img src={"http://127.0.0.1:5000"+post.postImages[0]} className=" h-28 md:h-32 aspect-square " alt="property"/></span>}
                       <span>
                        <div><span className="text-yellow-600" >Title: </span>{post.title}</div>
                        <div><span className="text-yellow-600" >Rent: </span>₹{post.rent}</div>
                        <div><span className="text-yellow-600" >Type: </span>{post.type}</div>
                        <div><span className="text-yellow-600" >City: </span>{post.city}</div>
                        <div><span className="text-yellow-600" >State: </span>{post.state}</div>
                       </span>
                    </div>
                ))
        )}
        </div>
    </div>
  );
};

export default Search;
