
import React from "react";
import "../css/navBar.css";

import { Appcontext } from "./context";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

function NavBar(){
  let history = useHistory()
  const{login , setLoginPop} = React.useContext(Appcontext);
  const{ setToken} = React.useContext(Appcontext);
const storeData = window.localStorage.getItem("infos")
const lToken = window.localStorage.getItem("token")
const answer = JSON.parse(storeData)




    return(
        <>
        <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#b384f5"}}>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" 
  aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"><i className="fas fa-sliders-h tg"></i></span>
  </button>
  <img src="./images/wheel.png" style={{width:"40px" , height:"40px" , marginRight:"8px"}} alt="logos"/>
  <a className="navbar-brand navitem appName" href="/">Rental<span className="sName">Vehicle</span></a>

  <div className="collapse navbar-collapse end" id="navbarTogglerDemo03">
    <ul className="navbar-nav">
      <li><Link className="navLink" to="/">Home</Link></li>
      
      <li><Link className="navLink" to="/book">Book-Vehicle</Link></li>
    </ul>
    <ul className="navbar-nav">
     
      <li className="nav-item active">
      {lToken ?  <div className="dropdown">
      <button className="btn dropdown-toggle dropLog" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {answer.name}
      </button>
      <div className="dropdown-menu drop" aria-labelledby="dropdownMenu2">
        <Link to="/profile">
        <button className="dropdown-item" type="button" style={{cursor:"pointer"}}><i className="far fa-address-card icon"></i>Search History</button></Link>
        <Link to="/forgetPass">
        <button className="dropdown-item" type="button" style={{cursor:"pointer"}}><i className="fas fa-cogs icon"></i>Change Password</button></Link>
        <button className="dropdown-item"  onClick={()=>{
         setToken("")
        localStorage.clear();
        history.push("/")}}
        type="button" style={{cursor:"pointer"}}><i className="fas fa-palette icon"></i>LogOut</button>
         {/* <button className="dropdown-item" type="button" onClick={()=>{
           verifyingManually()
           setBikePop(!bookPop)
         }}><i className="far fa-address-card icon"></i>Verify E-mail</button> */}
      </div>
    </div>:
      //<button className="navLog" onClick={()=>{setLoginPop(false)}}>{loggedData.name}<i class="fas fa-sign-in-alt  logIcon"></i></button> : 
      <button className="navLog"  onClick={()=>{setLoginPop(!login)}}>Login<i className="fas fa-sign-in-alt  logIcon"></i></button>
      }
        
      </li>
      <li className="nav-item">
        
       <button className="navLog" onClick={()=>{
        history.push("/register")}}>Sign-Up</button>
        
      </li>
    </ul>
  </div>
</nav>

</>
    )
}

export default NavBar;