import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState('');
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                console.log("fetching starts")
           const token = localStorage.getItem("token")
           const userDetails = (localStorage.getItem("user"))
            if(token && userDetails){
                const parsedDetails = JSON.parse(userDetails);
        setUser(parsedDetails.firstName);
        }
    else{
        console.error("there is no data in token")
    }
}
        catch(error){
            console.error("error by getting details",error)
        }
    }
        fetchUser();
    },[])
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col font-bold text-cyan-500 justify-center h-full text-xl  ml-4">
            PayTM App
        </div>
        <div className="flex pr-4">
            <div className="flex flex-col font-bold justify-center text-xl text-purple-700 h-full mr-4">
                Hello {user}
            </div>
            <div className="rounded-full h-11 w-11 font-bold  text-white bg-cyan-400 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user[0]}
                </div>
                </div>
                <div>
                <svg onClick={async () => {
                    const response = await localStorage.token && localStorage.user
            try{
        if (response) {
          localStorage.removeItem("token", response);
          localStorage.removeItem("user",response)
          navigate("/signin");
        } else {
          console.error("Token not found in local storage", localstorage.token);
        }
      }
      catch(error) {
        console.error("Logout failed", error);
      }
        }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer size-6 flex flex-col justify-center h-full  text-rose-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>
                </div>
        </div>
    </div>
}
