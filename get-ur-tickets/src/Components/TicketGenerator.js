import React from 'react';
import DetailsPopover from "../Components/popOver.tsx";
    
    export var chkMore = false;
    export var chkLess = false;

    export class TicketComponent extends React.Component{

        eventlocation = "N/A"
        eventname = "N/A"
        eventhyperlink = "N/A"
        eventprice = "N/A"

        flightname = "N/A"
        flighturl = "N/A"
        airlinelogo = "N/A"
        travelclass = "N/A"
        flightprice = "N/A"

        hotelprice = "N/A"
        hotelurl = "N/A"
        hotelname = "N/A"
        hotelclass = "N/A"
        total = "N/A"
    
        setParams(eventname, eventhyperlink, eventlocation, eventprice, flighturl, flightname, airlinelogo, travelclass, flightprice, hotelprice, hotelurl, hotelname, hotelclass, total){

            this.eventlocation = eventlocation //Setting event information
            this.eventname = eventname
            this.eventhyperlink = eventhyperlink
            this.eventprice = eventprice

            this.flighturl = flighturl          //setting flight information
            this.flightname = flightname
            this.airlinelogo = airlinelogo
            this.travelclass = travelclass
            this.flightprice = flightprice

            this.hotelprice = hotelprice        //setting hotel information
            this.hotelurl = hotelurl
            this.hotelname = hotelname
            this.hotelclass = hotelclass

            this.total = total
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
                <img src={this.airlinelogo} alt="" width={'25px'} height={'25px'}/> {" " + this.flightname}
                <br/>
                Travel Class: {this.travelclass}  
            </div>
    
            <div style=
            {{  
                flex: 2, 
                textAlign: 'left', 
                paddingRight: '10px' 
            }}>
                <strong>Hotel Price:</strong> {this.hotelprice}
                <br/>
                Hotel Name: {this.hotelname}
                <br/>
                Hotel Rating: {this.hotelclass}
                <br/>
                <a href={this.hotelurl}> hotel purchase link</a>
                {/* Placeholder for additional details or subpage */}
                <br/><DetailsPopover /> {/* */}
            </div>
            
            <div style=
            {{ 
                flex: 1, 
                textAlign: 'right', 
                //whiteSpace: 'nowrap',
            }}>
                <strong>Estimated Total Price:</strong> {"$" + this.total}
            </div>
            </div>
            )
        /*this will be used to create the display ticket with prices, location, link, etc... */
    };
}
    


    export class Tickets extends TicketComponent {
        getTickets(ticketNum, tracking){
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
                let tmp = ticketNum[i]["Venue"]
                tmp = tmp.replaceAll("+", " "); // replaces all + in venue name
                this.setParams(ticketNum[i]["Name"],ticketNum[i]["Ticket_URL"],tmp,ticketNum[i]["Ticket_Price"], //event name, event hyperlink, event location, event price
                    ticketNum[i]["Flight"]["URL"],ticketNum[i]["Flight"]["Airline"],ticketNum[i]["Flight"]["Logo"], ticketNum[i]["Flight"]["Travel_Class"], ticketNum[i]["Flight"]["Price"],//flight url, flight name, airline logo, travel class, flight price
                    ticketNum[i]["Hotel"]["Price"],ticketNum[i]["Hotel"]["URL"],ticketNum[i]["Hotel"]["Name"],ticketNum[i]["Hotel"]["Hotel_Class"], ticketNum[i]["Total_Price"] )//hotel price, hotel url, hotel name, hotel class, total
                //event name, event hyperlink, event location, event price, flight url, flight name, airline logo, travel class, flight price, hotel price, hotel url, hotel name, hotel class, total
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
