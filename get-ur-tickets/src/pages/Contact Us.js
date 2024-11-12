import React, { useState } from 'react';
import MyButton from "../Components/MyButton";        
import Fly_Now from "../Pictures/NewBanner.png";
import { useAuthenticator } from '@aws-amplify/ui-react';

export function Contact() {
  const [showButton, setShowButton] = useState(true);

  // Function to toggle buttons visibility
  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const { user } = useAuthenticator();

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
        <div style={{marginTop: "5%"}}>
          <div className="Nav-Banner"></div>
          <div className="Word-Color" style={{color:"white"}}>Welcome, {user.username}!</div>
        </div>
        </div>

{/* Contact Us Section */}
<div className="contact-info">
  <h2>Contact Us</h2>
  <p>Email: contact@example.com</p>
  <p>Phone: (123) 456-7890</p>
</div>
</div>  
);
}



