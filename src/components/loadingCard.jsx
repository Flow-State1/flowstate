import React from "react";
import logo from "../assets/flow-state-logo.png";
import NavSideBarComponent from "./nav-side-bar";

const LoadingCard = () => {
    return(
        <div className="container-loading-card">
            <NavSideBarComponent />
            <div className="loading-card-screen">
                <div>
                    <img src={logo} alt="Flow State Logo" className="loading-screen-logo spinner"/>
                </div>

                <div>
                    <h1 className="loading-card-title">Loading...</h1>
                </div>
            </div>
        </div>
    )
}

export default LoadingCard;