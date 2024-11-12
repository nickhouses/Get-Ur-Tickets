import React from 'react';
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Fly_Now from "../Pictures/Fly_Now.png";

export function Login() {
    return (
        /* Bootstrap container */
        <div className="container-fluid bg-light py-5"> 

            {/* Banner */}
            <div className="text-center mb-4">
                <img alt="Fly Now" className="img-fluid w-75" src={Fly_Now} />
            </div>

            {/* About Us Text */}
            <div className="container-md text-center">
                <h1 className="text-primary mb-3">About Us</h1>
                <h2 className="text-secondary mb-3">
                    Our team has built this project to seek a better alternative to inflated venue ticket costs.
                    In some scenarios, it may be more cost-effective to purchase a vacation package to see your
                    favorite artist on tour in lieu of seeing them in your home city.
                </h2>
                <br />
                <h2 className="text-secondary mb-4">
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
        </div>
    );
}
