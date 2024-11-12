import React from 'react';
import Logo from '../Pictures/newLogo.png'; 

const Header = () => {
    return (
        <header className="bg-dark text-white fixed-top py-3">
            <div className="container d-flex align-items-center">
                <img src={Logo} alt="Logo" width="50" className="me-3" />
                <h1 className="m-0">Get Ur Tickets</h1>
            </div>
        </header>
    );
};

export default Header;
