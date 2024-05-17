import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
function App(){
  return(
    <>
  <BrowserRouter>
  <Routes>
    <Router path = '/signup' element ={<Signup/>}/>
    <Router path = '/signin' element = {<Signin/>}/>
    <Router path = '/dashboard' element = {<Dashboard/>}/>
    <Router path= '/send' element = {<Send/>}/>
  </Routes>
  </BrowserRouter>
  </>
)
}