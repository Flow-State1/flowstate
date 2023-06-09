import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "./styles.css"

const ResetPassword = () => {
    const navigate = useNavigate();

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
                    
                    <img src={logo} alt="logo" className="logo" />
                    <div className="logo-title">
                        <h1>
                            floW-stAte
                        </h1>
                    </div>

                    <h1 className="reset-card-title">Reset Password</h1>
                    <form className="reset-form">
                        <input type="text" placeholder="Email" className="reset-input" />
                        <button className="reset-button" onClick={handleResetPassword}>
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