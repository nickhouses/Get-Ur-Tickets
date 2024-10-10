import React from 'react';
import DetailsPopover from "../Components/popOver.tsx";
    
    export var chkMore = false;
    export var chkLess = false;

    export class TicketComponent extends React.Component{

        eventlocation = "N/A"
        eventname = "N/A"
        flighturl = "N/A"
        hotel = "N/A"
        total = "N/A"
        eventhyperlink = "N/A"
        eventprice = "N/A"
        flightstart = "N/A"
        flightend = "N/A"
        to = "N/A"
    
        setParams(eventname, eventhyperlink,eventlocation, eventprice, flighturl, flightstart, flightend, flightprice, hotel, total){
            this.eventlocation = eventlocation
            this.eventname = eventname
            this.flighturl = flighturl
            this.hotel = hotel
            this.total = total
            this.eventhyperlink = eventhyperlink
            this.eventprice = eventprice
            this.flightstart = flightstart
            this.flightend = flightend
            this.flightprice = flightprice
        }
    
    startRender(){
            return (
            <div className="Ticket-Box" 
            style=
            {{       
                height: 'auto', 
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
                <br/> {this.eventlocation}     
            </div>
    
            <div style=
            {{ 
                flex: 2, 
                textAlign: 'left', 
                paddingRight: '10px' 
            }}>
                <strong>Event Price:</strong> {'$' + this.eventprice}
                <br/>
                {this.eventname}
                <br/>
                <a href={this.eventhyperlink}> event details</a>
                <br/>
            </div>
    
            <div style=
            {{ 
                flex: 2, 
                textAlign: 'left', 
                paddingRight: '10px' 
            }}>
                <strong>Flight Price:
                </strong> {'$' + this.flightprice}
                <br/>
                {/* First implementation of details popover. Replace props as needed. (name, header, etc...) */}
                <DetailsPopover
                name = "Flight Details"
                header = "DEP -> ARR"
                line1 = "From: Departure City"
                line2 = "To: Arrival City"
                />
                <br/>
                <a href={this.flighturl}> flight purchase link</a>
                <br/>
                Dates: {this.flightstart + " - " + this.flightend}  
            </div>
    
            <div style=
            {{  
                flex: 2, 
                textAlign: 'left', 
                paddingRight: '10px' 
            }}>
                <strong>Hotel:</strong> {this.hotel}
                {/* Placeholder for additional details or subpage */}
                <br/><DetailsPopover /> {/* */}
            </div>
            
            <div style=
            {{ 
                flex: 1, 
                textAlign: 'right', 
                whiteSpace: 'nowrap',
            }}>
                <strong>Estimated Total Price:</strong> {"$" + this.total}
            </div>
            </div>
            )
        /*this will be used to create the display ticket with prices, location, link, etc... */
    };
}
    


    export class Tickets extends TicketComponent {
        getTickets(ticketNum, tracking, MoreOrLess){
            var ahh = [];
            chkMore = false;
            chkLess = false;
            if(ticketNum.length === 0){
                console.log(" returning home ")
                return;
            }
            /*For loop to push Ticket display into array, testing with 5 for now. Here you will get the number of result and ticket information from get command */

            for ( let i = 0; i < tracking; i++){
                console.log("!!!!!!")
                this.setParams(ticketNum[i]["Name"], ticketNum[i]["Ticket_URL"], ticketNum[i]["Venue"][0] + " " + ticketNum[i]["Venue"][1], ticketNum[i]["Ticket_Price"], ticketNum[i]["Flight_URL"], ticketNum[i]["Flight_Start_Date"], 
                ticketNum[i]["Flight_End Date"], ticketNum[i]["Flight_Price"], "", ticketNum[i]["Total_Price"] )
                //event name, event hyperlink, event location, event price, flight url, flight start, flight end, flight price, hotel, total
                ahh.push(this.startRender())
            }
            if(tracking !== ticketNum.length && tracking < ticketNum.length){
                chkMore = true;
            }
            if(tracking > 5){
                chkLess = true;
            }
            //both chkMore and chkLess can be true at the same time. Globals used for see more and see less hyperlinks
            return ahh;
        }
    }
