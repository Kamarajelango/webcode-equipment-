
import React from "react";
import { Appcontext } from "./context";
import "../css/login.css"
import { Link } from "react-router-dom";
import axios from "axios";

function LogIn(){
   
    const {user , setUser} = React.useContext(Appcontext)   
    const{login , setLoginPop} = React.useContext(Appcontext);
    const { setLoggedData} =  React.useContext(Appcontext);
    const{ setToken} = React.useContext(Appcontext);
    const[ msg , setMsg] = React.useState ("")  

//    login logic
        async function logged(){
            try{
                const response = await axios.post("https://bike-rental-portal.herokuapp.com/user/login",{
                    email: user.email,
                    password: user.password
                })

            setLoggedData(response.data)
            window.localStorage.setItem("infos" , JSON.stringify(response.data))

                if(response.data.authToken){
                    setLoginPop(false)
                    window.localStorage.setItem("token" , response.data.authToken)
                    setToken(response.data.authToken)
                   
                }else{
                    setLoginPop(true)
                    setMsg(response.data.message)
                   
                }
            }catch(error){
                console.log(error)
            }
        }
       
  
    function handleChange(event){
        switch (event.target.name) {
            case "emailId":
                setUser({...user , email:event.target.value})
                break;
            case "password":
                setUser({...user , password:event.target.value})
                break;
            default:
                break;
        }
    }

   function handleSubmit(event){
        event.preventDefault()
         logged()
         setUser({...user , email:"" , password:""})
       
    }

    return(
        <>
        <div className="logBack">
            <div className="logForm">
                <div className="loghead">
                    <h4 style={{marginBottom:"0"}}>LOGIN FORM</h4>
                    <p style={{color:"pink" , marginBottom:"0px"}}>(Get Your First Ride Booked Today)</p>
                    <p style={{marginBottom:"0px"}}>{msg ? msg : null}</p>
                </div>
                <form onSubmit={handleSubmit} style={{padding:"15px"}}>
                    <input  className="form-control" type="email" name="emailId" value={user.email} placeholder="enter your email address" onChange={handleChange}/><br/>
                    <input  className="form-control" type="password" name="password" value={user.password} placeholder="enter password" onChange={handleChange}/><br/>
                    <hr/>
                    <button className="btn btn-primary btn-lg btn-block lgbtn" type="submit">Login</button>
                    <button className="btn btn-danger btn-lg btn-block lgbtn" onClick={()=>{setLoginPop(!login)}}>Cancel</button>
                </form>
                <div className="linkDiv">
                <Link to="/forgetPass">Forget Password ?</Link>
                <Link to="/register">Sign-up/Register</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default LogIn;