import React from "react";
import "../css/msg.css"
import { Appcontext } from "./context";
import { Link } from "react-router-dom";

function Msg(){
    const {  bookPop , setBikePop} = React.useContext(Appcontext)
    const {msg , setMsg } = React.useContext(Appcontext)
   
    return(
        <>
        <div className="msgdiv1">
            <div className="msgdiv2">
                {/* <i class="fas fa-check-circle fa-2x faa" style={{marginTop:"20px"}}></i> */}
                <h4 className="bookMsg">{msg ? msg.message : null}</h4>
                {
                    msg=== "" ? <button type="button" className="btn btn-primary butt" disabled>OK</button> : 
                    msg==="check your link" ?  <Link to="/verifyEmail/:id" >
                    <button type="button" className="btn btn-primary butt" onClick={()=>{setBikePop(!bookPop)}}>OK</button></Link>:
                    <Link to="/" ><button type="button" className="btn btn-primary butt" onClick={()=>{
                    setBikePop(!bookPop)
                    setMsg("")
                    }}>OK</button>
                    </Link>
                }
               
            </div>
        </div>
        </>
    )
}

export default Msg;