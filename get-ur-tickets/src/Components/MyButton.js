import { useNavigate } from "react-router-dom";
import React from 'react';
import { signOut } from "aws-amplify/auth";
import PropTypes from 'prop-types';


const MyButton = ({ to }) =>{

    const navigate = useNavigate();
    return (
      <button className="my-button" onClick={() => { 
        if(to === "signout"){
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

MyButton.propTypes = {
  to: PropTypes.func.isRequired,
};

export default MyButton;