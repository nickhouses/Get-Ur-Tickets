import React, { useState } from 'react';
import MyButton from "../Components/MyButton"; 
import UserBanner from './Home'          
import Fly_Now from "../Pictures/Fly_Now.png";

export function Contact() {
  const [showButton, setShowButton] = useState(true);

  // Function to toggle buttons visibility
  const toggleButton = () => {
    setShowButton(!showButton);
  };

  return (
    <div className='banner-container'>
      {/* Banner Image */}
      <img alt="Website Banner of Hotel/Flight/Concert" className="Top-Banner" src={Fly_Now} />

      {/* Button overlay and User Banner */}
      <div className='button-overlay'>
        {/* Button to show or hide the Contact/Signout buttons */}
        <button className="Top-Banner-2" onClick={toggleButton} />

        {/* Conditionally show buttons */}
        {!showButton && (
          <div className='button-group'>
            <MyButton to="Home" />
            <MyButton to="signout" />
          </div>
        )}

        {/* User Banner displaying welcome message */}
        <UserBanner />
      </div>
    </div>
  );
}
