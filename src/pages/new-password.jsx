import React from "react";
import logo from "../assets/flow-state-logo.png";
import video from "../assets/background-video.mp4";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import BackgroundVideo from "../components/backgroundVideo";
import LoadingScreen from "../components/loadingScreen";

const NewPassword = () => {
    const navigate = useNavigate();
    
    const handleNewPassword = () => {
        navigate("/login");
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }, []);

    return(
        <div className="container-new-password">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                /* Render your main content here */
                <div>
                    <BackgroundVideo />
                    <div className="login-card">
                        <div className="login-card-logo">
                            <img src={logo} alt="Flow State Logo" className="login-logo"/>
                            <h1 className="login-title">floW-stAte</h1>
                        </div>

                        <div className="login-card-form">
                            <h1 className="login-form-title">New Password</h1>

                            <form className="login-form">
                                <input type="password" className="login-form-input" placeholder="New Password"/>
                                <input type="password" className="login-form-input" placeholder="Confirm Password"/>
                                
                                <button className="login-form-button" onClick={handleNewPassword} >Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewPassword;