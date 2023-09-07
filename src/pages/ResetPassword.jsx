import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import logo from "../assets/logo.png";
import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {

    const {
        isTabletOrLaptop,
        email, 
        HandleResetPassword, 
        ResetOnChange, 
        isLoading,
        errorMessage,
        isErrorVisible,
        setIsErrorVisible,
    } = useContext(AppContext);

    return (
        <motion.div 
            className="reset-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            >
            <div className="reset-card">
                <div className="reset-card-content">        
                    <img 
                        src={logo} alt="logo" 
                        className="logo" 
                        style={{ width: isTabletOrLaptop ? '18rem' : '14rem' }}
                    />
                    <div className="logo-title">
                        <h1>
                            Flow State
                        </h1>
                    </div>

                    <form className="reset-form" onSubmit={HandleResetPassword}>
                        <h1 className="reset-card-title">Reset Password</h1>
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={ResetOnChange}
                            placeholder="Email" 
                            className="reset-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
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
                            className="reset-button" 
                            style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verify Email'}
                        </button>

                        <Link to="/login" className="login-link">
                            Remember your password? Login
                        </Link>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}

export default React.memo(ResetPassword)