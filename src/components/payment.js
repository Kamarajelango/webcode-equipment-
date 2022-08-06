

import React from "react";
import { Appcontext } from "./context";
import "../css/pay.css"
import axios from "axios";
import NavBar from "./navbar";
import Msg from "./message";
import {useHistory} from "react-router-dom"

function Pay(){
    let history = useHistory()
    const{bikeInfo}= React.useContext(Appcontext)
    const{sDate } = React.useContext(Appcontext)
    const {eDate } = React.useContext(Appcontext)
    const { startTime} = React.useContext(Appcontext)
    const { endTime ,bookPop , setBikePop} = React.useContext(Appcontext)
    const {setMsg ,pickUp ,setPickUp } = React.useContext(Appcontext)
    const { data , setData } = React.useContext(Appcontext)

    const[cardName , setcardName] = React.useState("")
    const[cardNum , setCardNum] = React.useState("")
    const[cvv , setcvv] = React.useState("")
    const[exp , setExp] = React.useState("")

  let date1 = new Date(sDate.toLocaleDateString().toString());
  let date2 = new Date(eDate.toLocaleDateString().toString())
  let  Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

//creating an instance for the axios
  const storeData = window.localStorage.getItem("token")
  const instance = axios.create({
    baseURL: "https://bike-rental-portal.herokuapp.com" , 
    headers:{
        "auth-token" : storeData
    },
})

async function chekdata(value){
      const response = await instance.post("/booking",{
        _id : value._id,
        startDate :sDate.getTime(),
        endDate :eDate.getTime(),
        startTime : startTime.toLocaleTimeString(),
        endTime : endTime.toLocaleTimeString(),
        pickUp : pickUp,
      })
      setMsg(response.data)
      let old = [...data]
      let index = old.findIndex((item)=>item._id === response.data._id)
      old[index]= response.data
      setData(old)
}

function condition(value){
    if(cardName === "" || cardNum==="" || cvv==="" || exp===""){
        return alert("Enter valid card details")
    }else{
        chekdata(value)
        setBikePop(true)
        setPickUp("")
    }
}

function handleChange(event){
    switch (event.target.name) {
        case "cardName":
            setcardName(event.target.value)
            break;
        case "cardNum":
            setCardNum(event.target.value)
            break;
        case "cvv":
            setcvv(event.target.value)
            break;
        case "exp":
            setExp(event.target.value)
            break;

        default:
            break;
    }
}

function handleSubmit(event){
    event.preventDefault()
    console.log("working")
   resetData()
}


function resetData(){
    setcardName("")
    setCardNum("")
    setcvv("")
}

    return(
        <>
        {
             startTime && endTime ? 
        <>
        <NavBar/>
        <div className ="payParent">
                    <form className="pDiv2" onSubmit={handleSubmit}>
                    <p style={{color:"green" , fontWeight:"bold" , fontSize:"1.2rem"}}><span className="priceing3 " style={{marginRight:"20px"}}>Pay Amount : </span>
                            {sDate.toLocaleDateString().toString() === eDate.toLocaleDateString().toString() ? 
                            ((bikeInfo.rent +350 ) +  " Rs." ): ((bikeInfo.rent * Difference_In_Days + 350) + " Rs.")}</p>
                            <hr style={{marginBottom:"10px"}}/>
                       
                        <input type="text" value={cardName} name="cardName" 
                        placeholder="enter card holder name" 
                        onChange={handleChange} className="form-control" required></input><br/>
                    
                        <input type = "text" value={cardNum} name="cardNum" 
                        placeholder="enter card number" onChange={handleChange}
                         className="form-control paytext" required></input><br/>
                        <div style={{display:"flex"}}>
                            <div style={{padding :"10px"}}>
                                <input type="number " value={cvv} name="cvv" placeholder="CVV" 
                                onChange={handleChange} className="form-control paytext" required></input>
                            </div>
                            <div style={{padding :"10px"}}>
                                <input type="text " value={exp} name="exp" placeholder="MM/YYYY" 
                                onChange={handleChange} className="form-control paytext" required></input>
                            </div>
                        </div>
                        
                        <div className="debimg">
                            <img className="allCredit" src="./images/allCards.png" alt="pay"/>
                        </div>
                        <button type="submit" className="btn  btn-lg btn-block btnn pbtn" 
                        onClick={()=>{
                            condition(bikeInfo) 
                            }}> Pay amount </button>
                    
                    </form>
                
           
        </div>
        {
            bookPop===true ? <Msg/> :null
        }</>: history.push("/book")}
        </>
    )
}

export default Pay;