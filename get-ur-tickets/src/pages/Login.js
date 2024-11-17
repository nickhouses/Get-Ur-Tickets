import React from 'react';
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Container from "react-bootstrap/Container";
import NewLogo from "../Pictures/newLogo.png";

export function Login() {
    return (
        /* Bootstrap container */
        <Container fluid className='banner-container' style={{padding: "0%", margin:"0%", overflowX: 'hidden'}}>
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <img src={NewLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} />
                    <div className="text-center mt-3" style={{ fontSize: '4rem', fontFamily: 'sans-serif' }}>
                        GET UR TICKETS
                    </div>
                </div>
            </div>

            {/* About Us Text */}
            <div className="container-md text-center">
                <h1 className="text-primary text-white mb-3">About Us</h1>
                <h2 className="text-secondary text-white mb-3">
                    Our team has built this project to seek a better alternative to inflated venue ticket costs.
                    In some scenarios, it may be more cost-effective to purchase a vacation package to see your
                    favorite artist on tour in lieu of seeing them in your home city.
                </h2>
                <br />
                <h2 className="text-secondary text-white mb-4">
                    This web application will allow you to explore events including flights and hotels from
                    aggregated data via third parties, all in one place for transparency and your convenience.
                    To access our search engine, please login or create an account below.
                </h2>
            </div>
                

            {/* Authention */}
            <div className="d-flex justify-content-center">
                <div className="w-50">
                    <Authenticator />
                </div>
            </div>
        </Container>
    );
}
