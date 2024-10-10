import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { signOut } from "aws-amplify/auth";

const MyButton = ({ to }) =>{

  const [showButton, setShowButton] = useState(true);
  const toggleButton = () => {
      setShowButton(!showButton);
  };
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
          width: '75px',
          height: '50px',
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