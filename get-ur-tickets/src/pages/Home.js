import React, { useState } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import DetailsPopover from "../Components/popOver.tsx";


class TicketComponent extends React.Component{


  render(){
      return (
        
      <div className="Ticket-Box" 
        style=
        {{        
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '20px', 
          border: '1px solid #ddd', 
          margin: '10px 0' 
        }}>
        <div style=
        {{ 
          flex: 1, 
          textAlign: 'left', 
          paddingRight: '10px' 
        }}>
          <strong>Location:</strong>
          <br/> New York
        </div>

        <div style=
        {{ 
          flex: 2, 
          textAlign: 'left', 
          paddingRight: '10px' 
        }}>
          <strong>Event:</strong> Taylor Swift
          <br/>
        </div>

        <div style=
        {{ 
          flex: 2, 
          textAlign: 'left', 
          paddingRight: '10px' 
        }}>
          <strong>Flight:
          </strong> Spirit Airlines
          <br/>
          {/* First implementation of details popover. Replace props as needed. (name, header, etc...) */}
          <DetailsPopover
            name = "Flight Details"
            header = "DEP -> ARR"
            line1 = "From: Departure City"
            line2 = "To: Arrival City"
          />
        </div>

        <div style=
        {{  
          flex: 2, 
          textAlign: 'left', 
          paddingRight: '10px' 
        }}>
          <strong>Hotel:</strong> Holiday Inn
          {/* Placeholder for additional details or subpage */}
          <br/><DetailsPopover /> {/* */}
        </div>
        
        <div style=
        {{ 
          flex: 1, 
          textAlign: 'right' 
        }}>
          <strong>Price:</strong> $1500
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



