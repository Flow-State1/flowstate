import React from "react";
import logo from "../assets/flow-state-logo.png";
import "../pages/styles.css";
import BackgroundVideo from "./backgroundVideo";

const LoadingScreen = () => {
    return(
        <div className="container-loading-screen">
            <BackgroundVideo />

            <div className="loading-screen">
                <div>
                    <img src={logo} alt="Flow State Logo" className="loading-screen-logo spinner"/>
                </div>

                <div>
                    <h1 className="loading-screen-title">Loading...</h1>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;