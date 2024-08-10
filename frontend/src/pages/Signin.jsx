import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
export const Signin = () => {
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
            setUserName(e.target.value)
        }}
        placeholder="****@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
            setPassword(e.target.value)
        }}
        placeholder="******" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/signin`,{
            userName,
            password
        })
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/dashboard");
        } else {
          console.error("Token not found in response", response.data);
        }
      }
      catch(error) {
        console.error("Sign in failed", error);
      }
        }}
        label={"Sign in"} 
        />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}