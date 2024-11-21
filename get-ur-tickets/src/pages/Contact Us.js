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

  const [formErrors, setFormErrors] = useState({
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
    setFormErrors({
      ...formErrors,
      [name]: ''  // Reset error message when user starts typing
    });
  };

  // validate first name, letters and ' only
  const validateFirstName = (firstName) => {
    if (!firstName) return "First name is required.";
    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(firstName)) {
      return "First name can only contain letters, spaces, hyphens, and apostrophes.";
    }
    return '';
  };
  
  // validate last name, letters and ' only
  const validateLastName = (lastName) => {
    if (!lastName) return "Last name is required.";
    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(lastName)) {
      return "Last name can only contain letters, spaces, hyphens, and apostrophes.";
    }
    return '';
  };
  
  // validate email
  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return "Invalid email format.";
    }
    return ''; 
  };

  // validate message
  const validateMessage = (message) => {
    if (!message) return "Message is required.";
    if (message.length < 10) return "Message must be at least 10 characters long.";
    const regex = /^[a-zA-Z0-9\s.,!?'"()&-]*$/;
    if (!regex.test(message)) {
      return "Message contains invalid characters. Only letters, spaces, commas, periods, and basic punctuation are allowed.";
    }
    return ''; 
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message)
    };

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors);
      return;  // Stop submission if there are errors
    }

    // If no errors, submit the form data
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
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
          <img src={NewLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} />
          <div className="text-center mt-3" style={{ fontSize: '4rem', fontFamily: 'sans-serif' }}>
            GET UR TICKETS
          </div>
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto' }}>
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
              {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
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
              {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
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
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
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
            {formErrors.message && <div className="error-message">{formErrors.message}</div>}
          </div>

          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </Container>
  );
}
