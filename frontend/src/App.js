import * as React from 'react';
import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import MapInfo from './components/MapInfo';
import {useState, useEffect} from "react";
import Logout from './components/Logout';


function App() {
  const [user, setUser] = useState();

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("userData");
    if(loggedInUser){
      setUser(JSON.parse(loggedInUser))
    }
  }, [] // leave empty
  );
  

  if (user) {
    return (
    <>
      {user.username} is logged in 
      <Logout/> 
      <MapInfo/>
    </>
    
    );
  }

  return (
    <div className="App">
      <><Login/><Register/></>
    </div>
  );
}

export default App;
