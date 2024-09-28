import React, { useState } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";


class TicketComponent extends React.Component{
  
  
  render(){
      return (
          <div className="Ticket-Box">
            <div
              style={{ 
                position: 'flex',
                textAlign: 'center',
              }}
            >
              Location:
            </div>
            <div
              style={{ 
                position: 'flex',
                textAlign: 'left',
              }}
            >
              Event: Taylor Swift /hyperlink
              <br></br>
              <br></br>
              Flight: Spirit Airlines /hyperlink
              <br></br>
              <br></br>
              Hotel: Holiday Inn /hyperlink
            </div>
  
            <div
              style={{ 
                position: 'relative',
                textAlign: 'right',
                paddingRight: '50px',
              }}
            >
              Price: $1500
            </div>
          </div>
      )
  }
  /*this will be used to create the display ticket with prices, location, link, etc... */
};

class Tickets extends TicketComponent {
  getTickets(){
      let items = []
        /*For loop to push Ticket display into array, testing with 5 for now. Here you will get the number of result and ticket information from get command */
      for ( let ticketNumber = 0; ticketNumber < 5; ticketNumber++){
          items.push(<TicketComponent/>)
      }
      return items;
  }

}

export function Home(){
  


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

              {obj.getTickets()}
          </div>
        </div>
      </div>
    )


}



