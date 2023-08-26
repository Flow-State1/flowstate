import React from "react";
import logo from "../assets/flow-state-logo.png";
import video from "../assets/background-video.mp4";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import "./styles.css";
import BackgroundVideo from "../components/backgroundVideo";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }, []);

      const handleResetPassword = () => {
        navigate("/new-password");
      }


    return(
        <div className="container-reset-password">
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
                            <h1 className="login-form-title">Reset Password</h1>

                            <form className="login-form">
                                <input type="text" className="login-form-input" placeholder="Email"/>
                                
                                <div className="login-form-have-account">
                                    <a href="/login">Remember your password? Login</a>
                                </div>
                                
                                <button className="login-form-button" onClick={handleResetPassword} >Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResetPassword;