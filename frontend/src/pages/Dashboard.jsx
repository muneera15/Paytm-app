import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect,useState } from "react"
import axios from "axios"
export const Dashboard=()=>{
    const [balance,setBalance]=useState(0);
    const fetch = async()=>{
        try{
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/account/balance`,{
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response =>{
                setBalance(response.data.balance)
            })
        }
        catch(error){
            console.error("Error fetching balance:",error)
        }
    }
    fetch()
    return <div>
    <Appbar />
    <div className="m-8">
        <Balance value={balance} />
        <Users />
    </div>
</div>
}