
import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
function VerifyMail(props){

    const[ eToken] = React.useState (props.match.params.id)
    const[vmsg , setVmsg] = React.useState({})
   
    // verifying the mail
    React.useEffect(()=>{
      async function mailId(){ 
        try{
            const response = await axios.put(`https://bike-rental-portal.herokuapp.com/verify/${eToken}`)
            console.log(eToken)
            setVmsg(response.data)
        }catch(error){
            console.log(error)
        }}
        mailId()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
        <div>
            <div style={{height:"350px" , width:"250px", margin:"20px auto 0 auto",
             color:"green" , textAlign:"center"}}>
               {
               vmsg ? <>
               <h2 style={vmsg.message==="something went wrong" ? {color:"red"}: {color:"green"}}>{vmsg.message}</h2>
               <Link to="/">
               <button class="btn btn-success">Ok</button>
               </Link>
                </> : null
                }
            </div>
        </div>
        </>
    )
}

export default VerifyMail