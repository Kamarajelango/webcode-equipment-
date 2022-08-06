import React from "react";
import NavBar from "./navbar";
import {Appcontext} from "./context";
import {Link} from "react-router-dom";
import axios from "axios";
import "../css/profile.css"


function Profile() {
  const { data, setData } = React.useContext(Appcontext);
  const storeData = window.localStorage.getItem("infos");
  const answer = JSON.parse(storeData);

  // call to get the bike info
  async function getData() {
    try {
      const response = await axios.get("https://bike-rental-portal.herokuapp.com/bike");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //getting the auth token from the local storage
  const storeTk = window.localStorage.getItem("token");

  // creating an instance for the api call
  const instance = axios.create({
    baseURL: "https://bike-rental-portal.herokuapp.com",
    headers: {
      "auth-token": storeTk,
    },
  });


  // for deleting the booking
  async function deleteBook(items, item) {
    try {
      const response = await instance.put(
        "https://bike-rental-portal.herokuapp.com/deleteBooking",
        {
          _id: item._id,
          bookId: items.bookId,
        }
      );
     
      let old = [...data];
      let index = old.findIndex((item) => item._id === response.data._id);
      old[index] = response.data;
      setData(old);
    } catch (error) {
      console.log(error);
    }
  }

  const getter = data;
  const getter2 = getter.filter((item) => item.booking.length !== 0);
  const getter3 = getter2.map((item) => {
    // let count = 0;
    let oo = []
    item.booking.forEach((value) => {
      if (value.userId === answer.id) {
        return(oo.push(value));
      } else {
        return;
      }
    });
    
    return { ...item, booking: oo };
  });

  console.log(getter3)

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 colsss1">
            <div className="leftDash">
              <div className="profImage">
                <img className="selfCam" src="./images/ride.jpg" alt="" />
              </div>
              <hr />
              <div style={{ padding: "15px" }}>
                <p>
                  <span>UserName : </span>
                  {answer.name}
                </p>
                <p>
                  <span>Email : </span>
                  {answer.email}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Link to="/book">
                  {" "}
                  <button type="button" className="btn btn-danger">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 colsss2">
            <div>
              <p className="myBook">My Bookings</p>
            </div>

            <hr style={{ marginTop: "0px" }} />
            <div className="tablecss">
              <table className="table tablecss">
                <thead className="thead-dark">
                  <tr>
                  <th>Vehicle NAME</th>
                  <th>BOOK DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  getter3.map((item) => {
                    if(item.booking.length !==0){

                   
                    return (
                      <>
                        <tr style={{ textAlign: "center" }} key={item._id}>
                          <td
                            style={{ fontWeight: "bold", paddingTop: "25px" }}
                          >
                            {item.bikeName}
                          </td>

                          <td>
                            <tbody>
                              <tr>
                                {/* <thead> */}
                                  <tr key={item._id}>
                                  <th>Start</th>
                                  <th>End</th>
                                  <th>Start-Time</th>
                                  <th>End-Time</th>
                                  <th>Pick-up Location</th>
                                  <th>Action</th>
                                </tr>
                                {/* </thead> */}
                                {item.booking.map((items) => {
                                  let stoday = new Date(items.startDate);
                                  let dd = String(stoday.getDate());
                                  let mm = String(stoday.getMonth() + 1); //January is 0!
                                  let yyyy = stoday.getFullYear();
                                  stoday = mm + '/' + dd + '/' + yyyy;
                                  // console.log(stoday)

                                  let etoday = new Date(items.endDate);
                                  let ddd = String(etoday.getDate()).padStart(2, '0');
                                  let mmm = String(etoday.getMonth() + 1).padStart(2, '0'); //January is 0!
                                  let yyyyy = etoday.getFullYear();
                                  etoday = mmm + '/' + ddd + '/' + yyyyy;
                                  return (
                                    <tr key={items.bookId}>
                                      <td>{stoday}</td>
                                      <td>{etoday}</td>
                                      <td>{items.startTime}</td>
                                      <td>{items.endTime}</td>
                                      <td>{items.pickUp}</td>
                                      
                                      <td>
                                        <button
                                          className="btn btn-info"
                                          onClick={() => {
                                            deleteBook(items, item);
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </td>
                        </tr>
                      </>
                    ); }else{
                      return(
                        <>
                        </>
                      )
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
}

export default Profile;