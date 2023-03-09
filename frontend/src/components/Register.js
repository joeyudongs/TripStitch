import axios from "axios";
import React from "react";
import { useState } from "react";
import Form from '../Form.css';

export default function Register() {
    const[ username, setUsername] = useState("");
    const[ password, setPassword] = useState("");
    const[ repeatPassword, setPasswordRepeat] = useState("");
    const[registered, setRegistered] = useState(false);

    function handlePassword(e) {setPassword(e.target.value)}
    function handlePasswordRepeat(e) {setPasswordRepeat(e.target.value)}

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios.post("/user/register", {"username": username, "password": password, "passwordConfirmation": repeatPassword});
        if(res.status === 200){
          setRegistered(true);
        }
        }
        catch(err){
            console.log(err);
        }
    }

    if(registered){
      return (
        <div> </div>
      );
    }
  
    return (
      <>
      <div className="form-box">
            <form
              onSubmit={handleSubmit} >
            <label  htmlFor="register-username"> Username: </label>
            <input
                type = "text" 
                value={username}
                onChange = {(event) => setUsername(event.target.value)}
                name = "register-username"
                id = "register-username" />
            <label  htmlFor="register-password"> Password: </label>
            <input 
                type = "password"
                value={password}
                onChange = {handlePassword}
                name = "register-password"
                id = "register-password" />
            <label  htmlFor="register-password-repeat"> Repeat Password: </label>
            <input 
                type = "password"
                value={repeatPassword}
                onChange = {handlePasswordRepeat}
                name = "register-password-repeat"
                id = "register-password-repeat" />
            <input 
                type= "submit"
                value = "Register"
                disabled = {
                        username.length === 0 || password.length === 0 || password !== repeatPassword
                } />
        </form>
        </div>
      </>
    );
  }