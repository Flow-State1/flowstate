import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";
import "./styles.css"

const NewPassword = () => {
    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const handleLogin = () => {
        navigate("/login");
    }
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <motion.div
            className="new-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            >
            <div className="new-card">
                <div className="new-card-content">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="logo" 
                        style={{ width: isTabletOrLaptop ? '18rem' : '14rem' }}
                    />
                    <div className="logo-title">
                        <h1>
                            Flow State
                        </h1>
                    </div>

                    <form className="new-form">
                        <h1 className="new-card-title">New Password</h1>
                        <input 
                            type="text" 
                            placeholder="New Password" 
                            className="new-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Confirm Password" 
                            className="new-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className="reset-eye-icon"
                        />
                        <button 
                            className="new-button" 
                            onClick={handleLogin} 
                            style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default React.memo(NewPassword)