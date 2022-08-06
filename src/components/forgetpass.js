import React from "react";
import axios from "axios";
import"../css/forget.css";
import Msg from "./message";
import { Appcontext } from "./context";

function Forget(){
    const [resetEmail , setResetEmail] = React.useState("")
    const {setMsg , setBikePop , bookPop} = React.useContext(Appcontext)

    function handleChange(event){
        switch (event.target.name) {
            case "email":
                setResetEmail(event.target.value)
                break;
            default:
                break;
        }
    }

    
    async function reset(){
        try{
            const response = await axios.put("https://bike-rental-portal.herokuapp.com/reset",{
                email : resetEmail
            })
            setMsg(response.data)
            setResetEmail("")
        }catch(error){
            console.log(error)
        }
      
    }

    function handleSubmit(event){
        event.preventDefault();
        reset();
        setBikePop(!bookPop)
    }

    return(
        <>
        <div className="back">
            <div className="mid">
                <form onSubmit={handleSubmit}>
                <div className="titles">
                <i class="fas fa-user-edit fa-3x resetPass"></i>
                <p className="welcome">Reset Your Password</p>
                </div>
            
            <input className="form-control text" value={resetEmail} name="email" type="email"
            placeholder ="Enter your email" onChange={handleChange} required></input><br/>

            <button type="submit" className="btn-lg btn-block btn btn-primary btns" style={{borderRadius:"2rem"}} >Reset</button>
                </form>
            </div>
        </div>
        {
            bookPop===true ? <Msg/> : null
        }
        </>
    )
}

export default Forget;