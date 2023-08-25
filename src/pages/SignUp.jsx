import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import { AppContext } from "../context/AppContext";

const SignUp = () => {

    const {
        isTabletOrLaptop,
        isErrorVisible,
        passwordVisible,
        errorMessage,
        name,
        email,
        password,
        confirmPassword,
        setIsErrorVisible,
        togglePasswordVisibility,
        SignUpOnChange,
        SignUpSubmit,
        isLoading
    } = useContext(AppContext);

    return(
        <motion.div 
            className="signup-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            <div className="signup-card">
                <div className="signup-card-content">
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

                    <form className="signup-form" onSubmit={SignUpSubmit}>
                        <h1 className="signup-card-title">Sign Up</h1>
                        <input 
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name" 
                            onChange={SignUpOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={SignUpOnChange}
                            className="signup-input"
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password"
                            value={password}
                            placeholder="Password" 
                            onChange={SignUpOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password" 
                            onChange={SignUpOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash} 
                            onClick={togglePasswordVisibility}
                            className="sign-eye-icon"
                        />

                        {isErrorVisible && (
                        <div className="error-message">
                            <span>{errorMessage}</span>
                            <button className="close-button" onClick={() => setIsErrorVisible(false)}>
                            &#x2716; {/* Unicode character for '✖' */}
                            </button>
                        </div>
                        )}

                        <button 
                            className="signup-button" 
                            style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign Up'}
                        </button>

                        <Link to="/login" className="login-link">
                            Already have an account? Login
                        </Link>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default React.memo(SignUp)
