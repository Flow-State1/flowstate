import React, { useState }from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import logo from "../assets/logo.png";
import "./styles.css"

const SignUp = () => {
    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

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

                    <form className="signup-form">
                        <h1 className="signup-card-title">Sign Up</h1>
                        <input type="text" 
                            placeholder="Name" 
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Password" 
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash} 
                            onClick={togglePasswordVisibility}
                            className="sign-eye-icon"
                        />

                        <button className="signup-button" onClick={() => navigate("/dashboard/dashboard/dashboard")} style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}>
                            Sign Up
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