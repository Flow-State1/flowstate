import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import logo from "../assets/logo.png";
import "./styles.css"

const ResetPassword = () => {
    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const handleResetPassword = () => {
        navigate("/newpassword");
    }
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

                    <form className="reset-form">
                        <h1 className="reset-card-title">Reset Password</h1>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="reset-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                        />
                        <button 
                            className="reset-button" 
                            onClick={handleResetPassword} 
                            style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                        >
                            Reset Password
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