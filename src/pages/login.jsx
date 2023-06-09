import React from "react";
import logo from "../assets/flow-state-logo.png";
import video from "../assets/background-video.mp4";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";
import "./styles.css";
import BackgroundVideo from "../components/backgroundVideo";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
    }, []);


    const handleLogin = () => {
        navigate("/dashboard");
    }

    return(
        <div className="container-login">
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
                            <h1 className="login-form-title">Login</h1>

                            <form className="login-form">
                                
                                <input type="text" className="login-form-input" placeholder="Email"/>
                                <input type="password" className="login-form-input" placeholder="Password"/>

                                <div className="login-form-forgot-password">
                                    <a href="/reset-password">Forgot Password?</a>
                                </div>

                                <button className="login-form-button" onClick={handleLogin} >Login</button>

                                <div className="login-form-have-account">
                                    <a href="/sign-up">Don't have an account? Sign Up</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;