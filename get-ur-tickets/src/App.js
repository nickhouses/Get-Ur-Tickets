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
  const { user } = useAuthenticator(); // Get user info via useAuthenticator hook

  return (
    // Wrap the app in the Authenticator.Provider
    <Authenticator.Provider>
      <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh', color: 'white', paddingTop: 70}}>
        <Layout>
          <Routes>
            {/* Check if user is logged in */}
            {user ? (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/Contact Us" element={<Contact />} />
                <Route path="/" element={<Home />} /> {/* Default route when user is logged in */}
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Login />} />
                <Route path="/Contact Us" element={<Login />} />
              </>
            )}
          </Routes>
        </Layout>
      </div>
    </Authenticator.Provider>
  );
};

export default App;
