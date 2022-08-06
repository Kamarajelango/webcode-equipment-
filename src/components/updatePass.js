
import React from "react";
import axios from "axios";
import { Appcontext } from "./context";
import Msg from "./message";

function UpdatePass(props){

    const[pass1 , setPass1] = React.useState("")
    const[pass2 , setPass2] = React.useState("")
    const {setMsg} = React.useContext(Appcontext)
    const[tk ] = React.useState(props.match.params.id)
    const {  bookPop , setBikePop} = React.useContext(Appcontext)

    async function setNewPass(props){
        try{
            const response = await axios.put("https://bike-rental-portal.herokuapp.com/updatePassword",{
                newpassword : pass1,
                token : tk
            })
            setMsg(response.data)
            window.localStorage.clear()
        }catch(error){
            console.log(error)
        }
       

    }

    function handleChange(event){
        switch (event.target.name) {
            case "pass1":
                setPass1(event.target.value)
                break;
            case "pass2":
                setPass2(event.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        if(pass1===pass2){
            setNewPass()
            setBikePop(!bookPop)
        }else{
            return alert("please check your password")
        }
    }
    return(
        <>
        <div className="back">
            <div className="mid">
                <form onSubmit={handleSubmit}>
                <div className="titles">
                <i className="fas fa-key fa-3x resetPass"></i>
                <p className="welcome">Create New Password</p>
                </div>
                <input className="form-control text" value={pass1} type="password" name="pass1" 
                placeholder ="Enter new password" onChange={handleChange} required></input><br/>
                <input className="form-control text" value={pass2} type = "password"  name="pass2" 
                placeholder ="Confirm new password" onChange={handleChange} required></input><br/>
                 <button type="submit" className="btn-lg btn-block btn btn-primary btns" style={{borderRadius:"2rem"}}>Change Password</button>
                </form>
            </div>
        </div>
        {
            bookPop === true ? <Msg/> : null  
        }
        </>
    )
}

export default UpdatePass;