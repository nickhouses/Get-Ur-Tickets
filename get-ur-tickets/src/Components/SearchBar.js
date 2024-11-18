import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import {test} from './AirportSearchBar'

//export var effect = false; 
//effect && div will be used in Home.js to make the current tickets disappear when the next are loading.Have to figure out formatting to force loading below please enter airport before search line.

async function getBaseURL() {
  try {
    const response = await axios.get('');
    axios.defaults.baseURL = response.data['baseURL'];
  } catch (error) {
    console.error('Error:', error);
  }
}

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // Function to handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage('');
  };

  //validate the search
  const isValidSearchTerm = (term) => {
    const regex = /^[a-zA-Z0-9\s!]*$/;
    return regex.test(term);
  };

  // Function to handle the search request
  const handleSearch = async () => {
        
    // check input using isValidSearchTerm
    if(!isValidSearchTerm(searchTerm)){
      setErrorMessage('Search term contails illegal characters such as @#$%^&*-+');
      setSearchTerm('');
      return;
    }
    setLoading(true);
    //effect = true;
    // API call
    axios.defaults.baseURL = 'https://loadbalancer8888.pythonanywhere.com/';
    // axios.defaults.baseURL= 'http://127.0.0.1:80';

    await getBaseURL();
    console.log('Load Balancer URL: ', axios.defaults.baseURL);

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
    } finally {
      setLoading(false);
      //effect = false;
    }
  }


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
      <div className="search-bar-container">
      <TextField
        disabled = {test === '' ? true : false}
        className="search-input"
        variant="outlined"
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
      </div>
      <Button onClick={handleSearch}>
      <div className='search-button'  style={{cursor: test === '' ? 'not-allowed' : 'pointer', flexDirection: 'row'}}>    
            search
            </div>    
      </Button>
      {errorMessage && (
        <div className='error-message'>{errorMessage}</div> // display Error Message
      )}
      {loading && <div className='Second-Row-Ticket-Background' style={{textAlign: 'center'}}>
        <div style={{ display: 'inline-block', color: 'white', fontSize: '20pt'}}>
          Loading
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div> 
      </div>}
    </div>
  );
};

SearchBar.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
};

export default SearchBar;




      