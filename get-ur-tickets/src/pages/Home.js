import React, { useState, useEffect } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import DetailsPopover from "../Components/popOver.tsx";
import { Tickets } from "../Components/TicketGenerator.js"


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
    var obj = new Tickets();
    return(
      <div>
        <div>
          <img alt="" className="Top-Banner" src={Fly_Now}/>
        </div>
        <div className="Second-Row">
          <div className="LeftComponent">
            {showButton && <button className="Settings-Button" onClick={toggleButton}>Settings</button>}
            {!showButton && 
            <div>      
              <MyButton to=""/>
              <MyButton to="signout" />
            </div>    
            } 
          </div>
          <div className='Second-Row-Ticket-Background'>
            <h1>Hello  </h1>
              {console.log(hold)}
              {obj.getTickets(hold)}
          </div>
        </div>
      </div>
    )


}



