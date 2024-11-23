import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import airportData from '../airportData_flatui.json'; // Import JSON
import { LocationContext } from '../index';           // Import context
import '../AirportSearchBar.css';
import SearchBar from './SearchBar';

export var test = "";
export var test2 ="";
const AirportSearchBar = ({ onSelect }) => {
  const {location, setLocation } = useContext(LocationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [checkEscape, setcheckEscape] = useState(true); //used with handle escape and useeffect to exit suggestions box with escape key
  const [checkKeys, setcheckKeys] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const listRef = useRef(null);
  SearchBar.originAirportCode = location;
  const airports = airportData; // Imported JSON data

  //if the escape key is pressed set checkEscape to false so suggestion box closes

  const handleFocus = (e) => {
    console.log(e.key);
    if(e.repeat && e.key !== "Backspace"){
      console.log("while");
      e.preventDefault();
      e.tabIndex = 0;
      return;
    }
    e.target.focus({preventScroll: true});
    if(e.key === 'ArrowUp' && checkKeys > 0){
      e.target.blur();
      e.preventDefault();
      e.target.focus({preventScroll: true});
      setcheckKeys(prevIndex => Math.max(prevIndex - 1, 0));
    }
    else if(e.key === 'ArrowDown'){
      e.target.blur();
      e.preventDefault();
      e.target.focus({preventScroll: true});
      setcheckKeys(prevIndex => Math.min(prevIndex + 1, filteredAirports.length - 1));
    }
    else if(e.key === "Enter" && filteredAirports.length !== 0){
      handleSelect(filteredAirports[checkKeys])
    }
    else if (e.key === "Enter" && filteredAirports.length === 0){
      setErrorMessage('Error selecting airport: Airport not found.');
    }
    else if(e.key === "Tab"){
      console.log("HERE");
      if(e.shiftKey){
        if(checkKeys !== 0){
          e.target.blur();
          e.preventDefault();
          e.target.focus({preventScroll: true});
        }
        setcheckKeys(prevIndex => Math.max(prevIndex - 1, 0));
      }
      else{
      if(checkKeys !== parseInt(filteredAirports.length - 1)){  
          e.target.blur();
          e.preventDefault();
          e.target.focus({preventScroll: true});
        }
        setcheckKeys(prevIndex => Math.min(prevIndex + 1, filteredAirports.length - 1));
      }
    }
    else if(e.key === 'Escape' && checkEscape){
      setcheckEscape(false);
    }
  }

  //if there is any changes in the airport search bar the suggestions should come back
  useEffect(() => {
    setErrorMessage('');
    if(checkEscape === false){
      setcheckEscape(true);
      setcheckKeys(0);
    }
    if (listRef.current && checkKeys >= 0) {
      const activeItem = listRef.current.children[checkKeys];
      if (activeItem) {
        
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
    console.log(checkKeys)
  }, [searchTerm, checkKeys]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setcheckKeys(0);

    // Clear the populated suggestions if the user has not entered anything
    if (term.trim() === '') {
      setFilteredAirports([]);
      return;
    }

  
    // Filter out municipality (city) and iata code (airport code)
    const filtered = airports.filter(airport =>
      (airport.municipality && airport.municipality.toLowerCase().includes(term.toLowerCase())) ||
      (airport.iata_code && airport.iata_code.toLowerCase().includes(term.toLowerCase())) ||
      (airport.name && airport.name.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredAirports(filtered);
  };
  
  const handleSelect = (airport) => {
    setSearchTerm(airport.name);
    setFilteredAirports([]);
    setLocation(airport);
    if (onSelect) onSelect(airport);
    test = airport.iata_code;
    test2 = airport.name + " (" + airport.iata_code + ")";
    console.log(airport);
  };


  return (
    <div className="Airport-search-bar">
      <div className='description' >Enter your Home Airport. Currently set to: {test2}</div>
      <input
        aria-labelledby='Airport Search Bar'
        style={{width: '42%', alignItems: 'center'}}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for an airport..."
        onKeyDown={handleFocus}
      />
      {errorMessage && (
            <div className='error-message'>{errorMessage}</div> // display Error Message
      )}
      {searchTerm && filteredAirports.length > 0 && checkEscape && (
        <div tabIndex = {0} ref={listRef} className="suggestions" >
          {filteredAirports.map((airport, index) => (
            <button
              onKeyDown={handleFocus}
              key={airport.iata_code || airport.municipality || airport.name}
              id={checkKeys === index ? 'focus' : console.log(checkKeys + "   " + airport.iata_code + " " + parseInt(filteredAirports.length - 1)   + "  " + index + " !!!!")}
              tabIndex={checkKeys === parseInt(filteredAirports.length - 1)  && checkKeys === index ? -1 : checkKeys === index ? 0 : -1 }
              onClick={() => handleSelect(airport)
              }
            >
              {airport.name} ({airport.iata_code})
            </button>
          ))}
        </div>
      )}
      <br/>
      <div className='description'>Search for an Event.</div>
    </div>
  );
};

AirportSearchBar.propTypes = {
  onSelect: PropTypes.func.isRequired, // onSelect is required and should be a function
};

export default AirportSearchBar;