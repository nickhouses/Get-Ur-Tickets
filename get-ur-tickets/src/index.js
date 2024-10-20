import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authenticator } from "@aws-amplify/ui-react";
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import PropTypes from 'prop-types'; // Import PropTypes

Amplify.configure(awsExports);

// Use to retrieve airport chosen for departure info
export const LocationContext = React.createContext();
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = React.useState('');

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.object.isRequired, // onSelect is required and should be a object
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authenticator.Provider>
    <BrowserRouter>
      <LocationProvider>
        <App />
      </LocationProvider>
    </BrowserRouter>
  </Authenticator.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


