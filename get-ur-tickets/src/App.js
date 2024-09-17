import React, { useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import MyButton from './Components/MyButton';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {


  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;