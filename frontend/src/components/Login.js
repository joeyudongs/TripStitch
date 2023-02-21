import axios from "axios";
import React from "react";
import {useState} from "react";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[user, setUser] = useState();

    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleUsername(e){
      setUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, password};
        try{
        const res = await axios.post("/user/login", user);
        // set the state of the user
        setUser(res.data);
        console.log(res.data);
        // use local storage
        localStorage.setItem('userData', JSON.stringify(res.data));
        localStorage.setItem('userID', res.data.userid);
        console.log(localStorage.getItem('userData'));
        }
        catch(err){
            console.log(err);
        }
    }


    // if there's a user show the message below
    if (user) {
      return <div>{user.username} is logged in</div>;
    }
  
    return (
      <>
        <form
          onSubmit={handleSubmit}
        >
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            name="login-username"
            id="login-username"
          />
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            name="login-password"
            id="login-password"
          />
  
          <input type="submit" value="Login" disabled={username.length === 0} />
        </form>
      </>
    );
  }