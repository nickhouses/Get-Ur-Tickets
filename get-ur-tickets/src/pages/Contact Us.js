import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import NewLogo from "../Pictures/newLogo.png";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

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
    <Container fluid className='banner-container' style={{ padding: "0%", margin: "0%"}}>
      {/* Banner Section */}
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop:'5%' }}>
        <img src={NewLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} />
        <div className="text-center mt-3" style={{ fontSize: '4rem', fontFamily: 'sans-serif' }}>
          GET UR TICKETS
        </div>
      </div>
      </div>

      {/* Contact Us Form */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto',  }}>
          {/* First Name and Last Name fields in a row */}
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

          {/* Message field with larger height */}
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              style={{ width: '100%', height: '150px' }}
            />
          </div>

          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </Container>
  );
}
