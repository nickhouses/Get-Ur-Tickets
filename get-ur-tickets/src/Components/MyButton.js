import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const MyButton = ({ to }) =>{

  const [showButton, setShowButton] = useState(true);
  const toggleButton = () => {
      setShowButton(!showButton);
  };
    const navigate = useNavigate();

    return (
      <button className="my-button" onClick={() => { navigate(`/${to}`); }}
        style={{ 
          width: '75px',
          height: '50px',
          borderradius: '8px',
          flexdirection: 'row',
          textAlign: 'center',
    }}
      >
        Take me to {to === '' ? "home" : to}
      </button>
    )
}

export default MyButton;