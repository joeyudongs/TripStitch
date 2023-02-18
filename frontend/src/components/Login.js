import axios from "axios";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { useResource } from "react-request-hook";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handlePassword(e){
        setPassword(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginCredentials = new FormData(); 
        loginCredentials.append("username", username);
        loginCredentials.append("password", password);
        try{
        const res = await axios.post("/user/login", loginCredentials);
        console.log(res.data.response);
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
            onChange={(event) => setUsername(event.target.value)}
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