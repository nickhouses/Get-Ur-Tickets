import React, { useState, useEffect, useRef} from 'react';
import MyButton from "../Components/MyButton";
import { Tickets, chkMore, chkLess } from "../Components/TicketGenerator.js";
import { Authenticator } from '@aws-amplify/ui-react';
import AirportSearchBar from '../Components/AirportSearchBar'; // From File 1
import SearchBar from '../Components/SearchBar.js'; // From File 2
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from 'react-bootstrap/Col';
//import Image from 'react-bootstrap/Image';

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
export function Home() {

  const [tracking, setTracking] = useState(0); //used for tracking number of tickets
  const [hold, setHold] = useState(false); // used to display text if no results are found
  const [obj, setObj] = useState(); //stores ticket object
  const [checking, setChecking] = useState(false); //using 1 to show more and 2 to show less. anything else is an error
  const [homeLocation, setHomeLocation] = useState('');  // State to store the user's selected home airport location
  const [showButton, setShowButton] = useState(true); //Stores button state
  const [searchResults, setSearchResults] = useState([]); //stores search result
  const ref = useRef(false);//used to make the initial render not use the useEffect 

  const adjTrack = (pageChangeChk) => {
    console.log('inside a')
    if (pageChangeChk === 1) {
      console.log('inside see more')
      var needthis = (parseInt(tracking) + 5);
      console.log(searchResults.length + " CHECK " + needthis)
      if (needthis >= searchResults.length && tracking !== 0) {
        needthis -= needthis - searchResults.length;
        setTracking(needthis);
        console.log(searchResults.length + " in home " + tracking);
        setChecking(true);
      }
      else if ((needthis < searchResults.length)) {
        setTracking(needthis);
        console.log(searchResults.length + " in THIRD " + tracking + " " + needthis);
        setChecking(true);
      }
      else if (parseInt(tracking) === searchResults.length && searchResults.length !== 0) {
        setTracking(tracking);
        console.log(searchResults.length + " in home fourth " + tracking);
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
      if (tracking === searchResults.length) {
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

    /* Search Bar Start */
  const HandleSearchResults = (results) => {
    console.log("insideHandle " + results)
    setTracking(0);
    setSearchResults(results); // Update the search results state with API response
    if(results.length === 0){
      console.log("!?!?!")
      setHold(true);
    }
    else if(results.length !== 0 && hold === true){
      setHold(false);
    }
  };
    /* Search Bar End */

  //toggles button hiding/showing
  const toggleButton = () => {
    setShowButton(!showButton);
  };

    // Airport selection
  const handleAirportSelect = (airport) => {
    setHomeLocation(airport.iata_code); // Store the iata code as user's home location
    console.log("Selected Airport:", homeLocation);  // State to store the user's selected home airport location
   };
    //end Airport selection

  //if there are any changes to searchResults it sets tracking to 0. Fixes ticket population issue.
  useEffect(() => {
    if(!ref.current){
      setObj(new Tickets())
      ref.current = true;
    }
  },[ref]);

  return (
    <Container fluid className='banner-container' style={{padding: "0%", margin:"0%", overflow:"scroll"}}>
      <div>
      <div className='button-overlay'>
        {<button className="Top-Banner-2" onClick={toggleButton} />}
        {!showButton && (
        <div className='button-group' >
          <MyButton to="Contact Us" />
          <MyButton to="signout" />
        </div>
        )}
        <UserBanner />
        </div>
      <div class="background"></div>
      <div className='Second-Row-Ticket-Background'>
          <AirportSearchBar onSelect={handleAirportSelect}/>
          <SearchBar onSearchResults={HandleSearchResults}/>
        {/*Add a div below search bars so that we can add loading && div to clear tickets when loading*/}
        {searchResults.length > 0 && tracking === 0 ? setChecking(true): null}
        {searchResults.length > 0 && tracking === 0 && searchResults.length < 5 ? setTracking(searchResults.length) : null}
        {searchResults.length > 0 && tracking === 0 && searchResults.length >= 5 ? setTracking(5) : null}
        {searchResults.length > 0 && checking ? obj.getTickets(searchResults, tracking) : null}
        {searchResults.length > 0 && chkMore === true ? <button onClick={() => { adjTrack(1); }}>show more</button> : null}
        {searchResults.length > 0 && chkLess === true ? <button  onClick={() => { adjTrack(2); }}>show less</button> : null}
        {hold === true ? <div style={{ textAlign: 'center', color: 'white', fontSize: '20pt'}}>No results found.</div> : null}
      </div>
      </div>
    </Container>
  );
}
