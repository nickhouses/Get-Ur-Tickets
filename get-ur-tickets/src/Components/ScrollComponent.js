import React, { useState} from 'react';
import MyButton from "../Components/MyButton";
import { useAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types'; // Import PropTypes


const ScrollComponent = ({onScrollSelect}) => {
const [showButton, setShowButton] = useState(true); //Stores button state
const toggleButton = () => {
    setShowButton(!showButton);
  };

const { user } = useAuthenticator();

return (
    <div className='button-overlay'>
        
    {!onScrollSelect && <button id='Top-Banner-2' style={{animation: 'square-circle .5s', animationFillMode:'forwards'}}  onClick={toggleButton} />}
    {onScrollSelect && <button id='Top-Banner-2' style={{animation: 'circle-square .5s', animationFillMode:'forwards'}}  onClick={toggleButton} />}
    {!showButton && (
    <div className='button-group' style={{marginTop: onScrollSelect ? '4%' : '7%'}} >
      <MyButton to="Contact Us" />
      <MyButton to="signout" />
    </div>
    )}
      <div className="Nav-Banner"></div>
      {!onScrollSelect && <div className="Word-Color">Welcome, {user.username}!</div>}
  </div>
)
};

ScrollComponent.propTypes = {
    onScrollSelect: PropTypes.bool.isRequired, // onSelect is required and should be a function
  };
export default ScrollComponent;