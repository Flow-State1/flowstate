import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import { AppContext } from "../context/AppContext";

const Login = () => {

const {LoginOnChange,LoginSubmit,email,password,isLoading,isErrorVisible,isTabletOrLaptop,passwordVisible,togglePasswordVisibility,setIsErrorVisible} = useContext(AppContext);

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
            style={{ width: isTabletOrLaptop ? "18rem" : "14rem" }}
          />
          <div className="logo-title">
            <h1>Flow State</h1>
          </div>

          <form className="login-form" onSubmit={LoginSubmit}>
            <h1 className="login-card-title">Login</h1>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={LoginOnChange}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={LoginOnChange}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="eye-icon"
            />

            {isErrorVisible && (
              <div className="error-message">
                <span>{errorMessage}</span>
                <button className="close-button" onClick={() => setIsErrorVisible(false)}>
                  &#x2716; {/* Unicode character for '✖' */}
                </button>
              </div>
            )}

            <Link to="/resetpassword" className="forgot-password-link">
              Forgot Password?
            </Link>

            <button
              className="login-button"
              style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
              disabled={isLoading}
            >
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
            </button>

            <Link to="/signup" className="signup-link">
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Login);
