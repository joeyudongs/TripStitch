import * as React from 'react';
import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import MapInfo from './components/MapInfo';
import {useState, useEffect} from "react";


function App() {
  const[user, setUser] = useState();

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("userData");
    if(loggedInUser){
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser);
      // console.log(user.username);
    }
  }, [] // leave empty
  );
  
  return (
    <div className="App">
      {/* <><Login/><Register/></> */}
       <MapInfo/>
    </div>
  );
}

export default App;
