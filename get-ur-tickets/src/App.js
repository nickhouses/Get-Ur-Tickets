import React, { useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import {  useAuthenticator } from '@aws-amplify/ui-react';


export default function App() {
  
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


//Put security checks in later