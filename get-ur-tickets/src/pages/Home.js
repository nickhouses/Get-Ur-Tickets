import React, { useState, useEffect } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import DetailsPopover from "../Components/popOver.tsx";
import { Tickets } from "../Components/TicketGenerator.js"
import { Authenticator } from '@aws-amplify/ui-react';
import { Contact } from './Contact';
import { Link } from 'react-router-dom';

const UserBanner = () => {
  return (
      <Authenticator>
          {({ user }) => (
              <div className="Nav-Banner">
                  <h1 className="Word-Color">Welcome, {user.username}!</h1>
              </div>
          )}
      </Authenticator>
  );
};

export default UserBanner;



export function Home(){

  const [data, setData] = useState()
  const [hold, setHold] = useState([])
  useEffect(() => {
    fetch('data/test2.json').then(
        response => {
          if(response.ok){
            console.log(response)
            return response.json()
          }
          else{
            console.log("not ok")
          }
      }
    ).then(
        data => {
          setData(data)
          var temp = data.result
          setHold(temp)
          
        },
    )
  }, []);


    const [showButton, setShowButton] = useState(true);
    const toggleButton = () => {
        setShowButton(!showButton);
    };
    const [MenuButton, setMenuButton] = useState(true);
    const toggleMenu = () => {
        setMenuButton(!MenuButton);
    };
    var obj = new Tickets();
    return(
      <div className='banner-container'>
          <img alt="" className="Top-Banner" src={Fly_Now}/>
          
        <div className='button-overlay'>
          
        {<button className="Top-Banner-2" onClick={toggleButton}>Settings</button>}
            {!showButton &&  (
            <div className='button-group'>      
              <MyButton to="signout" />
            </div>    
            )} 
          <UserBanner/>
          
        </div>
        <div className="Second-Row">
         
          <div className='Second-Row-Ticket-Background'>
          {<button className="Search-Button" onClick={toggleMenu}>Menu</button>}
            {!MenuButton &&  (
            <div className='button-group'>      
              <MyButton to="Restart Search" />
              <Link to="/Contact">
                <MyButton to="Contact Us" />
              </Link>
            </div>    
            )} 
              {console.log(hold)}
              {obj.getTickets(hold)}

          </div>
        </div>
      </div>
    )


}



