import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";
import "./styles.css"

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <motion.div 
            className="login-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            >
            <div className="login-card">
                <div className="login-card-content">
                    
                    <img src={logo} alt="logo" className="logo" />
                    <div className="logo-title">
                        <h1>
                            floW-stAte
                        </h1>
                    </div>

                    <h1 className="login-card-title">Login</h1>
                    <form className="login-form">
                        <input type="text" placeholder="Email" className="login-input" />
                        <input type={passwordVisible ? "text" : "password"} placeholder="Password" className="login-input" />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className="eye-icon"
                        />

                        <Link to="/resetpassword" className="forgot-password-link">
                            Forgot Password?
                        </Link>

                        <button className="login-button" onClick={() => navigate("/dashboard/dashboard/dashboard")}>
                            Login
                        </button>

                        <Link to="/signup" className="signup-link">
                            Don't have an account? Sign Up
                        </Link>                    
                    </form>
                </div>
            </div>
        </motion.div>
    );
}

export default React.memo(Login)