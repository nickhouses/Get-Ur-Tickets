import React, { useState } from 'react';
import ScrollComponent from '../Components/ScrollComponent.js'
import Container from "react-bootstrap/Container";
import NewBanner from "../Pictures/NewBanner.png"

export function Contact() {
  const [profile, setProfile] = useState(false); //Profile used for profile component transformation

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = Math.ceil(
        (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    console.log("inside handle " + position)
    if(position === 0){
      setProfile(false);
    }
    else{
      setProfile(true);
    }
  };

  return (
    <Container fluid className='banner-container' style={{padding: "0%", margin:"0%", overflow:"auto", overflowX: 'hidden'}} onScroll={handleScroll}>
      {<ScrollComponent onScrollSelect={profile}/>}
      <div>
        <img src={NewBanner} alt='NewBanner' className="background"></img>
        <div style={{position:'absolute', top:'18%', left:'45%', fontSize:'300%', fontFamily:'sans-serif'}}>GET UR TICKETS</div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </Container>  
  );
}



