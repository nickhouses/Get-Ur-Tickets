import { useNavigate } from "react-router-dom";
import React from 'react';
import { signOut } from "aws-amplify/auth";
import PropTypes from 'prop-types';


const MyButton = ({ to }) =>{

    const navigate = useNavigate();
    return (
      <button className="btn btn-outline-light" onClick={() => { 
        if(to === "Sign Out"){
          signOut()
        }
        else{
          console.log("inside my button")
          navigate(`/${to}`); 
        }
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