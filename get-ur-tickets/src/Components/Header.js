import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Pictures/newLogo.png';
import { useAuthenticator } from '@aws-amplify/ui-react'; 

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useAuthenticator(); // Check if user is logged in

    // Scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Listener for user scroll input
        window.addEventListener('scroll', handleScroll);

        // Cleanup for listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="bg-dark text-white fixed-top py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    {/* Resize logo based on scroll */}
                    <img
                        src={Logo}
                        alt="Logo"
                        width={isScrolled ? '30' : '60'} // Logo size change on scroll
                        className="me-3"
                        style={{ transition: 'width 0.3s ease' }}
                    />
                    {/* Webapp name clickable: */}
                    <Link
                        to="/home"
                        className="text-white text-decoration-none"
                        style={{
                            fontSize: isScrolled ? '1.5rem' : '2.5rem', // Text size change on scroll
                            transition: 'font-size 0.3s ease',
                        }}
                    >
                        Get Ur Tickets
                    </Link>
                </div>

                {/* Populate contact us button only if user is logged in. */}
                {user && (
                    <div>
                        <Link to="/contact us" className="btn btn-outline-light">Contact Us</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
