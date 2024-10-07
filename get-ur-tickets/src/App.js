import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Contact } from './pages/Contact';
import { Routes, Route} from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  const { user } = useAuthenticator();

  return (
    <>
      {user ? (
        <Routes> {/* If user is logged in, show these routes */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/" element={<Home />} /> {/* Default route when user is logged in */}
        </Routes>
      ) : (
        <Routes> {/* If user is not logged in, show login route */}
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Login />} />
          <Route path="/Contact" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

//Put security checks
export default () => (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
);
