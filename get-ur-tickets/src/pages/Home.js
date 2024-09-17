import { Link,  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { Login } from './Login';
import MyButton from "../Components/MyButton";
import image from "../Pictures/image.png";


class Tickets{
  constructor(venue, flight, hotel){
  }
  /*this will be used to create the display ticket with prices, location, link, etc... */
}

export function Home(){

    const [showButton, setShowButton] = useState(true);
    const toggleButton = () => {
        setShowButton(!showButton);
    };

    return(
      <div>
      <div>
        <img alt="" className="Top-Banner" src={image}/>
      </div>
      <div className="Second-Row">
        <div className="LeftComponent">
          {showButton && <button className="Settings-Button" onClick={toggleButton}>Settings</button>}
          {!showButton && 
          <div>      
            <MyButton to=""/>
            <MyButton to="Login" />
          </div>    
          } 
        </div>
        <div className='Test'>
          
        </div>
      </div>
    </div>
    )
}

