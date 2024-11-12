import React, { useState } from 'react';
import MyButton from "../Components/MyButton"; 
import UserBanner from './Home';         
import Fly_Now from "../Pictures/Fly_Now.png";

export function Contact() {
  const [showButton, setShowButton] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Function to toggle buttons visibility
  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
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

      {/* Contact Us Form */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
          
          {/* First Name and Last Name fields */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                required 
                style={{ width: '100%' }}
              />
            </div>
          </div>
          
          {/* Email field */}
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Message field */}
          <div>
            <label>Message:</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              required 
              style={{ width: '100%', height: '150px' }} // Larger size for message
            />
          </div>
          
          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>  
  );
}
