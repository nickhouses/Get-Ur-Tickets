import React, { useState} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import {test} from './AirportSearchBar'


const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const originAirportCode = test
  // Function to handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage('');
  };

  //validate the search
  const isValidSearchTerm = (term) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(term);
  };

  // Function to handle the search request
  const handleSearch = async () => {
        
    // check input using isValidSearchTerm
    if(!isValidSearchTerm(searchTerm)){
      setErrorMessage('Search term contails illegal characters');
      setSearchTerm('');
      return;
    }

    // API call
    axios.defaults.baseURL= 'https://geturtickets.pythonanywhere.com/';
   // axios.defaults.baseURL= 'http://127.0.0.1:80';
    try {    
      const response = await axios.post('/result', 
        {
        originAirportCode: test,  
        keyword: searchTerm  // Sending keyword
        }
      );
      console.log(test + " here")
      onSearchResults(response.data);  // Update with the data
      console.log(response);  // Log the response for debugging
    } catch (error) {
      console.error('Error fetching search results:', error);  // Log errors if they occur
    }
  };
      
        /*
      const response = await fetch('/result', { // proxy not working
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originAirportCode, keyword: searchTerm }),  // Sending keyword in JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();  // Parse the JSON response
  
     
      onSearchResults(data);  // Update the search results state
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    
  };*/


  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
        handleSearch();
    }
  }
  const handleClearSearch = () => {
    setSearchTerm('');  // Clear the search input
    setErrorMessage('');
  };


  return (
    
    <div className="search-section">
      <div className='description'>Please use this search bar to search for an event and select your local airport.  </div>
       <div className="search-bar-container">
      <TextField
        className="search-input"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUpCapture={handleKeyPress}
        placeholder="Search for an Event..."
        input={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch}>
              {/*reimplement close button*/}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button  onClick={handleSearch}>
      <div className='search-button'>    
            search
            </div>    
      </Button>
      </div>
      
      {errorMessage && (
        <div className='error-message'>{errorMessage}</div> // display Error Message
      )}
       
    </div>
  );

};


SearchBar.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
};

export default SearchBar;




      