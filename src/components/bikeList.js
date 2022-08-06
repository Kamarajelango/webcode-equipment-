import"../css/bike.css"
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Appcontext } from "./context";
import Dates from "./searchDate";
import NavBar from "./navbar"
import { Link } from "react-router-dom";
import LogIn from "./loginpage";
import ClipLoader from "react-spinners/ClipLoader";


function BikeList() {
  const{sDate  } = React.useContext(Appcontext)
  const {eDate} = React.useContext(Appcontext)
  const { data } = React.useContext(Appcontext)
  const{setBikeInfo} = React.useContext(Appcontext)
  const{pickUp , setPickUp} = React.useContext(Appcontext)
  const { startTime} = React.useContext(Appcontext)
  const { endTime} = React.useContext(Appcontext)
  const{login } = React.useContext(Appcontext);
  const {loading} = React.useContext(Appcontext);

  function handleChange(event){
    switch (event.target.name) {
      case "city":
        setPickUp(event.target.value)
        break;

      default:
        break;
    }
  }
  
let a =sDate.getTime()
let b = eDate.getTime()

console.log(sDate.toLocaleDateString().toString())
  return (
   <>
   <NavBar/>
   <Dates/>
   {/* <div className="parentss"> */}
  


   <div className="conatiner-fluid">

     {/* logic for the date Validation */}
     {
  loading ? 
  <div className='spinner'>
  <ClipLoader color={'red'} loading={loading} size={40} /></div> :
     <div className="row r1">
       {
       data.map((items)=>{
        let count = 0;
        if(items.booking.length===0){
          count = 0
        }
        if (items.booking.length !== 0) {
          items.booking.forEach((value) => {
            let stoday = new Date(value.startDate);
            let dd = String(stoday.getDate());
            let mm = String(stoday.getMonth() + 1); //January is 0!
            let yyyy = stoday.getFullYear();
            stoday = mm + "/" + dd + "/" + yyyy;

            let etoday = new Date(value.endDate);
            let ddd = String(etoday.getDate());
            let mmm = String(etoday.getMonth() + 1); //January is 0!
            let yyyyy = etoday.getFullYear();
            etoday = mmm + "/" + ddd + "/" + yyyyy;

            if (
              stoday === sDate.toLocaleDateString().toString() &&
              etoday === eDate.toLocaleDateString().toString()
            ) {
              return count++;
            } else if (
              etoday === sDate.toLocaleDateString().toString() &&
              etoday === eDate.toLocaleDateString().toString()
            ) {
              return count++;
            } else if (value.startDate > a && value.startDate > b) {
              if (count !== 0) {
                return count;
              } else {
                return (count = 0);
              }
            } else if (value.endDate >= a && value.endDate <= b) {
              return count++;
            } else if (value.startDate > a && value.startDate < b) {
              return count++;
            } else if (value.endDate < a && value.endDate < b) {
              if (count !== 0) {
                return count;
              } else {
                return (count = 0);
              }
            } else if (value.startDate <= a && value.endDate >= b) {
              return count++;
            } else {
              return;
            }
          });
        }
          
          return(
            <div className="col-lg-3 col-md-4 col-sm-6" key={items._id}>
            <div className="cardInfo">
           
            <div key = {items._id} className="cards" >
              <div className="imageDiv"><img style={{width:"100%" , height:"100%" ,padding:"20px"}} src={items.url} alt=""/></div>
              <div style={{textAlign:"center", borderBottom:"1px solid #e82231" , marginBottom:"5px"}}>
                 <p style={{ marginBottom : "4px"}}>{items.bikeName}</p>
              </div>
              <div className="bikeNum" style={(items.available - count)>0 ? {backgroundColor : "yellowgreen"}:{backgroundColor : "red"}}>
                <div className="available"><p className="line1">Available Vehicle</p></div>
                <div className="availablenum"> <p className="line2">{(items.available - count)<0 ? 0 : (items.available - count) }</p></div>
              </div>
             
              <div className="sumInfo">
                 <p className="p1"><span className="span1">Engine Power : </span>{items.power} cc</p>
                 <hr/>
                 <p className="p2"><span className="span2"> Mileage : </span>{items.mileg} per Litr.</p>
                 <hr/>
              </div>
              <div className="point">
                <p className="p1"><span className="span1">Pick-Up Point : </span></p>
               
                <select className="custom-select options" onChange={handleChange} name="city">
                  <option>Select PickUp Location</option>
                  <option>Pangong Lake</option>
                  <option>Nubra valley</option>
                  <option>Leh Palace</option>
                  <option>Khardung La</option>
                  <option>Hemis National Park</option>
                  <option>Chadar Trek</option>
                  <option>Likir Monastery</option>
                  <option>Lamayuru</option>
                </select>
              </div>
              <hr/>
              <div className="btnsDivs">
              <button type="button" className="btn  rsBtn">₹{items.rent} per Day</button>
              {
                (items.available - count)===0 || (items.available - count) <0 ? <Link to="/bookingDetails" ><button className="btn btn-bookBtn" disabled >BOOK NOW</button>

                </Link>:pickUp==="" ?
                <button className="btn  bookBtn" onClick={()=>{return alert("please select the pick up location")}} >BOOK NOW</button>:

                startTime===undefined || endTime===undefined?
                <button className="btn  bookBtn" onClick={()=>{return alert("Please Enter Valid Time")}} >BOOK NOW</button>:

                sDate===undefined || eDate===undefined?
                <button className="btn  bookBtn" onClick={()=>{return alert("Please Enter Valid Date ")}} >BOOK NOW</button>:

                sDate > eDate?
                <button className="btn  bookBtn" onClick={()=>{return alert("Please Enter valid end Date ")}} >BOOK NOW</button>:

                <Link to="/bookingDetails" onClick={()=>{  
                  setBikeInfo(items)
                 
                  }}><button className="btn  bookBtn">BOOK NOW</button></Link>
              } 
              </div> 
            </div>
            </div>
            </div>
          )
       })
       }
       

     {/* </div> */}
     </div> }
     </div>   
   
     {
       login===true ? <LogIn/> : null
     }
   </>
  );
}

export default BikeList;