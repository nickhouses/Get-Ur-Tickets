import React, { useState, useEffect } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import { Tickets, chkMore, chkLess } from "../Components/TicketGenerator.js";
import { Authenticator } from '@aws-amplify/ui-react';
import AirportSearchBar from '../Components/AirportSearchBar'; // From File 1
import SearchBar from '../Components/SearchBar.js'; // From File 2

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

//function a is used when someone presses see more or see less hyperlink. Calculates what the tracking variable needs to be to be passed into getTickets function
const a = (pageChangeChk, tracking, hold, setTracking, setChecking) => {
  console.log('inside a')
  if (pageChangeChk === 1) {
    console.log('inside see more')
    var needthis = (parseInt(tracking) + 5);
    console.log(hold.length + " CHECK " + needthis)
    if (needthis >= hold.length && tracking !== 0) {
      needthis -= needthis - hold.length;
      setTracking(needthis);
      console.log(hold.length + " in home " + tracking);
      setChecking(true);
    }
    else if ((needthis < hold.length)) {
      setTracking(needthis);
      console.log(hold.length + " in THIRD " + tracking + " " + needthis);
      setChecking(true);
    }
    else if (parseInt(tracking) === hold.length && hold.length !== 0) {
      setTracking(tracking);
      console.log(hold.length + " in home fourth " + tracking);
      setChecking(true);
    }
    else {
      console.log("error")
      return
    }
  }
  else if (pageChangeChk === 2) {
    console.log('inside see less')
    needthis = (parseInt(tracking) - 5)
    if (tracking === hold.length) {
      let loop = tracking;
      while (!(loop % 5 === 0)) {
        loop--;
      }
      setTracking(loop);
    }
    else if (needthis > 5) {
      console.log("less than, tracking > 5")
      setTracking(a => a - 5);
      setChecking(true);
    }
    else if (needthis <= 5) {
      console.log("less than, tracking < 5 " + tracking)
      setTracking(5);
      setChecking(true);
    }
    else {
      console.log("error")
      return
    }
  }
  else {
    console.log("ERROR: no more pages or less pages true")
  }
  return
}




export function Home() {

  const [data, setData] = useState(); //needed for testing
  const [tracking, setTracking] = useState(0); //used for tracking number of tickets
  const [hold, setHold] = useState([]); // needed for testing, getting data directly was acting weird
  const [obj, setObj] = useState(new Tickets()); //stores ticket object
  const [checking, setChecking] = useState(false); //using 1 to show more and 2 to show less. anything else is an error
  const [homeLocation, setHomeLocation] = useState('');  // State to store the user's selected home airport location
  const [showButton, setShowButton] = useState(true); //Stores button state
  const [searchResults, setSearchResults] = useState([]); //stores search result
  
    /* Search Bar Start */
  const handleSearchResults = (results) => {
    setSearchResults(results); // Update the search results state with API response
  };
    /* Search Bar End */

  //toggles button hiding/showing
  const toggleButton = () => {
    setShowButton(!showButton);
  };

    // Airport selection
    const handleAirportSelect = (airport) => {
      setHomeLocation(airport.iata_code); // Store the iata code as user's home location
      console.log("Selected Airport:", airport);
    };
    //end Airport selection

    /*
  useEffect(() => { //Comment this section out when applying real searches. This will only give test data
    fetch('data/test4.json').then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("not ok");
        }
      }
    ).then(
      data => {
        setData(data);
        var temp = data;
        setHold(temp);
        setObj(new Tickets());

      },
    );
  }, []);*/

  return (
    <div className='banner-container'>
      <img alt="Website Banner of Hotel/Flight/Concert" className="Top-Banner" src={Fly_Now}/>
      <div className='button-overlay'>
        {<button className="Top-Banner-2" onClick={toggleButton} />}
        {!showButton && (
          <div className='button-group'>
            <MyButton to="Contact Us" />
            <MyButton to="signout" />
          </div>
        )}
        <UserBanner />
      </div>

      {/* Airport Search Bar */}
      <div className="search-container">
        <AirportSearchBar onSelect={handleAirportSelect} />
        <div style={{color: 'white', paddingLeft: '5px'}}>Your departure airport is set to: {homeLocation}</div>
      </div>

      {/* Integrating the SearchBar component */}
      <div className='Second-Row-Ticket-Background'>
        <SearchBar onSearch={handleSearchResults} />

        {/* Display search results */}
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
        {data !== undefined && tracking === 0 ? setChecking(true) : null}
        {data !== undefined && tracking === 0 && hold.length < 5 ? setTracking(hold.length) : null}
        {data !== undefined && tracking === 0 && hold.length >= 5 ? setTracking(5) : null}
        {data !== undefined && checking ? obj.getTickets(hold, tracking) : null}
        {data !== undefined && chkMore === true ? <button onClick={() => { a(1,tracking, hold, tracking, checking); }}>show more</button> : null}
        {data !== undefined && chkLess === true ? <button  onClick={() => { a(2,tracking, hold, tracking, checking); }}>show less</button> : null}
        {searchResults.length === 0 ? <div style={{fontSize:'40px',color: 'white', textAlign:'center'}}> PLEASE ENTER HOME LOCATION AND EVENT NAME. </div> : null}
      </div>
    </div>
  );
}
