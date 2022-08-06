import React from "react";
import"../css/bike.css"
import "../css/date.css"
import axios from "axios";
import { Appcontext } from "./context";
import { DatePickerComponent} from "@syncfusion/ej2-react-calendars";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import "react-datepicker/dist/react-datepicker.css";

function Dates(){
    
  const{sDate , setsDate } = React.useContext(Appcontext)
  const {eDate , seteDate} = React.useContext(Appcontext)
  const {setData} = React.useContext(Appcontext)
  const { startTime , setStartTime} = React.useContext(Appcontext)
  const { endTime , setEndTime} = React.useContext(Appcontext)
  const {setLoading} = React.useContext(Appcontext);

  async function getData(){
    setLoading(true)
    // https://bike-rental-portal.herokuapp.com
    try{
      const response = await axios.get(" https://bike-rental-portal.herokuapp.com/bike")
      setData(response.data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  async function ascending(){
    setLoading(true)
    try{
      const response = await axios.get(" https://bike-rental-portal.herokuapp.com/sort/asc")
      setData(response.data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  async function descending(){
    setLoading(true)
    try{
      const response = await axios.get(" https://bike-rental-portal.herokuapp.com/sort/dsc")
      setData(response.data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }


  React.useEffect(()=>{
    getData()
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleSubmit(event){
    event.preventDefault()
    getData()
  }

  
    return (
      <div className="dateParent">
        <div className="dateChild">
        <div className="datePicker1">
        <i className="fas fa-map-marker-alt locationIcon"></i>
          <select className="location">
            <option>Ley</option>
          </select>
        </div>
        <div className="datePicker1">
        
        <DatePickerComponent
          value={sDate}
          onChange={(event) => {
            setsDate(event.target.value);
          }}
          placeholder="enter date"
          min={new Date()}
        />
        </div>
       <div className="timePicker1">
       <TimePickerComponent
          value={startTime}
          onChange={(event) => {
            setStartTime(event.target.value);
          }}
        
        />
       </div>
       <div className="datePicker2">
       <DatePickerComponent
          value={eDate}
          onChange={(event) => {
            seteDate(event.target.value);
          }}
          placeholder="enter date"
          min={sDate}
        />
       </div>
       <div className="timePicker2">
         
        <TimePickerComponent
          value={endTime}
          onChange={(event) => {
            setEndTime(event.target.value);
          }}
          min={startTime}
        />
       </div>
        <button onClick={handleSubmit} className="btn btn-outline-light rentBtn">Rent a Bike</button>
        <div className="dropdown">
          <button className="btn dropdown-toggle btn-outline-light" style={{height:"45px"}}
          type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort By
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button" onClick={ascending}>Low To High Price</button>
            <button className="dropdown-item" type="button" onClick={descending}>High To Low Price</button>
          </div>
        </div>
        </div>
      </div>
    );
}
export default Dates;