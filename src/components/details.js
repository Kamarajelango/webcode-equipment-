import React from "react";
import "../css/details.css"
import { Appcontext } from "./context";
import NavBar from "./navbar";
import LogIn from "./loginpage";
import {useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";

function Details(){

    let history = useHistory()

    const{bikeInfo}= React.useContext(Appcontext)
    const{sDate  } = React.useContext(Appcontext)
    const {eDate} = React.useContext(Appcontext)
    const { startTime } = React.useContext(Appcontext)
    const { endTime} = React.useContext(Appcontext)
    const {pickUp} = React.useContext(Appcontext)
    const{login , setLoginPop} = React.useContext(Appcontext);
 
  let date1 = new Date(sDate.toLocaleDateString().toString());
  let date2 = new Date(eDate.toLocaleDateString().toString())
  let  Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  
const storeData = window.localStorage.getItem("token")

// validating the auth-key
function condition(){
    var decoded = jwt.decode(storeData)

      if(storeData && decoded.exp*1000 >= Date.now()){
          history.push("/payment")
      }else{
       setLoginPop(!login)   
      }
  }

    return(
      
       <>
       {
           startTime && endTime ?
     <>
            <NavBar/>
            <div className="container-fluid">
            <div className="row infs">
                <div className = "col-lg-7 col11">
                    <div className="card1" style={{display:"flex"}}>
                        <div  className="allImageDiv">
                            <img  className="allImage" src={bikeInfo.url} alt=""/>
                            <div className="rentCard">
                            <p style={{marginBottom : "0" , padding:"6px" , color:"white"}}>{bikeInfo.rent} ₹. / Day</p>
                            </div>
                            <div className="tag">
                                <p className="tagInfo">Vehicle SUMMARY</p>
                            </div>
                           
                        </div>
                        <div className="bikeDetails">
                            <p className="bikeBrand">{bikeInfo.bikeName}</p>
                            <hr/>
                            <p className="numbers"><i className="fas fa-weight-hanging fa-2x weight"></i>
                            {bikeInfo.weight} Kg</p>
                            <hr/>
                            <p className="numbers"><i className="fas fa-tachometer-alt fa-2x meter" style={{color:"green"}}></i>
                            {bikeInfo.topSpeed} / km per hr</p>
                            <hr/>
                            <p className="numbers"><i className="fas fa-motorcycle fa-2x power" style={{color:"green"}}></i>
                            {bikeInfo.power} / cc</p>
                            <hr/>
                            <p className="numbers"><i className="fas fa-gas-pump fa-2x petrol" style={{color:"rgb(252, 252, 0)"}}></i>
                            {bikeInfo.fuelCapacity} Litr.</p>
                            <hr/>
                            
                        </div>
                    </div>
                    <div className="inst">
                    <p><i className="fas fa-check-circle fa-1x faa" ></i>Driving License is mandatory at the time of pickup.</p>
                    <p> <i className="fas fa-check-circle fa-1x faa" ></i>Original Aadhar Card or any Government ID proof is required</p>
                    <p><i className="fas fa-check-circle fa-1x faa"></i>Fuel Charges are not included.</p>
                    <p><i className="fas fa-check-circle fa-1x faa"></i>Complimentary helmet will be given to the Rider.</p>
                    <div className="infoTag"><p className="tagInfo">RIDING GUIDE</p></div>
                    </div>
                 </div>
                <div className="col-lg -5 were">
                    <div className="infoTag">
                    <p className="tagInfo">PRICE DETAILS</p>
                    </div>
                    <div>
                        <div className="priceDetails">
                            <p><span style={{marginLeft:"20px", marginRight:"185px" ,fontWeight:"bold"}}>Trip Start :
                            </span> {sDate.toDateString()} , {startTime.toLocaleTimeString()}</p>
                            <p><span style={{marginLeft:"20px", marginRight:"194px" ,fontWeight:"bold"}}>Trip End :
                            </span> {eDate.toDateString()} , {endTime.toLocaleTimeString()}</p>
                            <p><span style={{marginLeft:"20px", marginRight:"155px" ,fontWeight:"bold"}}>Pick Up Point :
                            </span> {pickUp}</p>
                            <p><span className="priceing1">Refundable Deposit Amount : </span> ₹ 350 </p>
                            <p><span className="priceing2">Rent : </span>{bikeInfo.rent} ₹ per Day</p>
                            <hr/>
                            <p style={{color:"green" , fontWeight:"bold" , fontSize:"1.2rem"}}><span className="priceing3">Total : </span>
                            {sDate.toLocaleDateString().toString() === eDate.toLocaleDateString().toString() ? 
                            ((bikeInfo.rent +350 ) +  " Rs." ): ((bikeInfo.rent * Difference_In_Days + 350) + " ₹.")}</p>
                            <hr/>
                        </div>
                        <div className="terms">
                        <h4 style={{color:"red"}}>Terms and Condition</h4>
                        <p style={{marginTop:"15px"}}> <i className="fas fa-check-circle fa-1x faa" ></i>Deposit will be refunded at end of trip.</p>
                        <p><i className="fas fa-check-circle fa-1x faa"></i>Extra charges will be charged on late.</p>
                        <p><i className="fas fa-check-circle fa-1x faa"></i>Fuel Charges are not included.</p>
                        <p><i className="fas fa-check-circle fa-1x faa"></i>Customer care no: +91 1234567890</p>
                        </div>
                        <hr/>
                        <button type="button" className="btn  btn-lg btn-block btnn" 
                        onClick={()=>{
                            condition() 
                            }}>Book / Pay amount </button>
                    </div>
                </div>
            </div>
            {
                login===true ? <LogIn/> : null
            }
        </div> </>: history.push("/book")} 
        </>
    )
}
export default Details;