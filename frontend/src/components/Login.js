import axios from "axios";
import React from "react";
import {useState} from "react";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleUsername(e){
      setUsername(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios.post("/user/login", {"username": username, "password": password});
        console.log(res.data.username);
        }
        catch(err){
            console.log(err);
        }
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