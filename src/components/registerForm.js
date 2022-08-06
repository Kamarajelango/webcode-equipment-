
import React from "react";
import axios from "axios";
import Msg from "./message";
import { Appcontext } from "./context";

function Register (){

    const {userName , setUserName} = React.useContext(Appcontext)
    const{email , setEmail} =React.useContext(Appcontext)
    const{password , setPassword} = React.useContext(Appcontext)
    const {setMsg , setBikePop , bookPop} = React.useContext(Appcontext)


    // api call for the registeration of the user
    async function reg (){
        try{
            const response = await axios.post("https://bike-rental-portal.herokuapp.com/user/register",{
                email:email,
                password:password,
                name :userName
            })
            setMsg(response.data)
        }catch(error){
            console.log(error)
        }
       
    }

    // handles the form changes 
    function handleChange(event){
       switch (event.target.name) {
           case "userName":
               setUserName(event.target.value)
               break;
            case "email":
                setEmail(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
           default:
               break;
       }

    }

    // handle submit
    function handleSubmit(event){
        event.preventDefault()
        reg()
        setUserName("")
        setEmail("")
        setPassword("")
        setBikePop(!bookPop)
    }
    return(
        <>
         <div className="back">
            <div className="mid">
                <form onSubmit={handleSubmit}>
                <div className="titles">
                <i className="fas fa-user-edit fa-3x resetPass"></i>
                <p className="welcome">Register / Sign-up Now</p>
                </div>
            
            <input className="form-control text" value={userName} name="userName" type="text"
            placeholder ="Enter username" onChange={handleChange} required></input><br/>
            <input className="form-control text" value={email} name="email" type="email"
            placeholder ="Enter your email" onChange={handleChange} required></input><br/>
            <input className="form-control text" value={password} name="password" type="password"
            placeholder ="Create Password" onChange={handleChange} required></input><br/>

            <button type="submit" className="btn-lg btn-block btn btn-primary btns" style={{borderRadius:"2rem"}}>Register</button>
                </form>
            </div>
        </div>
        {
            bookPop===true ? <Msg/> : null
        }
        
        </>
       
    )
}
export default Register;