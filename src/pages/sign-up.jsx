import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/flow-state-logo.png";
import BackgroundVideo from "../components/backgroundVideo";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import "./styles.css";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }, []);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }
    return(
        <div className="container-sign-up">
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
                        <h1 className="login-form-title">Sign Up</h1>

                        <form className="login-form">
                            <input type="text" className="login-form-input" placeholder="Name"/>
                            <input type="text" className="login-form-input" placeholder="Email"/>
                            <input type="password" className="login-form-input" placeholder="Password"/>
                            <input type="password" className="login-form-input" placeholder="Confirm Password"/>

                            <div className="login-form-have-account">
                                <a href="/login">Already have an account? Login</a>
                            </div>
                            
                            <button className="login-form-button" onClick={handleLogin} >Sign Up</button>
                        </form>
                    </div>
                </div>
                </div>
            )}

        </div>
    )
}

export default SignUp;