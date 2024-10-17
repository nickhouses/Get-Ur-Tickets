import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Contact } from './pages/Contact Us';
import { Routes, Route} from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  const { user } = useAuthenticator();

  return (
    <>
      <Authenticator.Provider>
      {user ? (
        <Routes> {/* If user is logged in, show these routes */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact Us" element={<Contact />} />
          <Route path="/" element={<Home />} /> {/* Default route when user is logged in */}
        </Routes>
      ) : (
        <Routes> {/* If user is not logged in, show login route */}
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Login />} />
          <Route path="/Contact Us" element={<Login />} />
        </Routes>
      )}
      </Authenticator.Provider>
    </>
  );
};

/*/Put security checks
export default () => (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
);*/
export default App;

