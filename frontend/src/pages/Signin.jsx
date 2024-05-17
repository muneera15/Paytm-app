import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin =()=>{
    return <div className="">
        <div className="">
            <div className="">
                <Heading label ={"Sign in"}/>
                <SubHeading label = {"Enter your credentials to access your account"}/>
                <InputBox placeholder= "muneerashaik03@gmail.com" label={"Email"}/>
                <InputBox placeholder = "123456" label ={"Password"}/>
                    <div className="">
                        <Button label = {"Sign in"}/>
            </div>
            <ButtomWarning label ={"Don't have an account?"} buttonText = {"Sign up"} to = {"/signup"}/>
        </div>
        </div>
    </div>
}