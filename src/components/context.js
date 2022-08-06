

import React  from "react";

export const Appcontext = React.createContext()

export const ContextProvider = (props)=> {
    
  const [sDate , setsDate] = React.useState(new Date());
  const [eDate , seteDate] = React.useState(new Date())
  const [ data , setData] = React.useState([])
  const [ startTime , setStartTime] = React.useState()
  const [ endTime , setEndTime] = React.useState()
  const[bikeInfo , setBikeInfo] = React.useState({})
  const[bookPop , setBikePop] = React.useState(false)
  const [ msg , setMsg] = React.useState({})
  const [pickUp, setPickUp] = React.useState("")
  const [loggedData , setLoggedData] = React.useState({})
  const [loading , setLoading] = React.useState(false)

//   login states
  const [userName , setUserName] = React.useState("")
  const[email , setEmail] = React.useState("")
  const[password , setPassword] = React.useState("")
  const[login , setLoginPop] = React.useState(false)
  const [user , setUser] = React.useState({
    email:"",
    password:""
})
  const[token , setToken] = React.useState("")
    return(
        <Appcontext.Provider value={{sDate , setsDate ,eDate, seteDate, data ,setData,
            startTime,setStartTime , endTime , setEndTime ,bikeInfo ,setBikeInfo,
            bookPop,setBikePop ,msg ,setMsg ,pickUp , setPickUp , userName ,setUserName,
            email , setEmail , password, setPassword , login , setLoginPop ,loggedData , setLoggedData,
            user , setUser,token , setToken , loading , setLoading}} >
            {props.children}
        </Appcontext.Provider>
    )
}
