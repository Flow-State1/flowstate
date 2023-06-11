import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import logo from "../assets/logo.png";
import "./styles.css"

const Login = () => {
    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
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
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ width: isTabletOrLaptop ? '18rem' : '14rem' }}
            />
            <div className="logo-title">
              <h1>Flow State</h1>
            </div>
  
            <form className="login-form">
              <h1 className="login-card-title">Login</h1>
              <input
                type="text"
                placeholder="Email"
                className="login-input"
                style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
              />
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="login-input"
                style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="eye-icon"
              />
  
              <Link to="/resetpassword" className="forgot-password-link">
                Forgot Password?
              </Link>
  
              <button
                className="login-button"
                onClick={() => navigate('/dashboard/dashboard/dashboard')}
                style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
              >
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