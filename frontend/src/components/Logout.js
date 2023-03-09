import React from "react";

export default function Logout(){
    return(
        <form onSubmit={ e=>{
            e.preventDefault();
            localStorage.clear();
            window.location.reload();
        }}>
        <input type = "submit"
        value= 'Logout'/>
        </form>
    )
}