
import React from "react";
import { ContextProvider } from "./components/context";
import BikeList from "./components/bikeList";
import Details from "./components/details"
import{BrowserRouter , Switch , Route} from "react-router-dom";
import Home from "./components/Home";
import Forget from "./components/forgetpass";
import UpdatePass from "./components/updatePass";
import Register from "./components/registerForm";
import VerifyMail from "./components/verifymail";
import Profile from "./components/profile";
import Pay from "./components/payment";
// import {Appcontext} from "../context";
// const { startTime , setStartTime} = React.useContext(Appcontext)

function App() {
  return(
    <>
    <ContextProvider>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/book" component={BikeList}/>
        <Route path="/bookingDetails" component={Details}/>
        <Route path="/forgetPass" component={Forget} />
        <Route exact path="/verifyEmail/:id" component={UpdatePass}/>
        <Route path="/register" component={Register}/>
        <Route path="/verify/:id" component={VerifyMail}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/payment" component={Pay}/>
      </Switch>
      </BrowserRouter>
    </ContextProvider>
    </>
  )
}

export default App;
