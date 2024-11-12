import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Contact } from './pages/Contact Us';
import { Routes, Route } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout'; 

const App = () => {
  const { user } = useAuthenticator();

  return (
    <>
      <Authenticator.Provider>
        {user ? (
          <Layout>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Contact Us" element={<Contact />} />
              <Route path="/" element={<Home />} /> {/* Default route when user is logged in */}
            </Routes>
          </Layout>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Login />} />
              <Route path="/Contact Us" element={<Login />} />
            </Routes>
          </Layout>
        )}
      </Authenticator.Provider>
    </>
  );
};

export default App;
