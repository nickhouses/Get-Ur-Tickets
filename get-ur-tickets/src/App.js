import React, { useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import {  Authenticator, useAuthenticator } from '@aws-amplify/ui-react';


const App = () => {
  
  const { user } = useAuthenticator();
  <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
  </>
      if(user){
        return <Home/>
      }
      else{
       return <Login/>
      }
}


//Put security checks
export default () => (
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>
);