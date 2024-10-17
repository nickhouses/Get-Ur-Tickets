import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { signOut } from "aws-amplify/auth";

const MyButton = ({ to }) =>{

    const navigate = useNavigate();

    return (
      <button className="my-button" onClick={() => { 
        if(to == "signout"){
          signOut()
        }
        else{
          console.log("inside my button")
          navigate(`/${to}`); 
        }
        }}
        style={{ 
          width: '90px',
          height: '75px',
          borderradius: '8px',
          flexdirection: 'row',
          textAlign: 'center',
    }}
      >
        {to === '' ? "home" : to}
      </button>
    )
}

export default MyButton;