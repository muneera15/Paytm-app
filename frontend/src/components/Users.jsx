import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetch = async()=>{
            try{
                
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/bulk?filter=` + filter)
                setUsers(response.data.user)
            }
            catch(error){
                console.error("Error fetching users",error);
            }
        }
        fetch();
    }, [filter])
    return <>
        <div className="font-bold text-purple-700 mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border border-cyan-500 rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-cyan-400 flex justify-center mt-1 mr-2">
                <div className="flex flex-col font-bold  justify-center text-white h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col font-bold text-purple-700 justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}