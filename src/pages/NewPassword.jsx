import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";
import "./styles.css"

const NewPassword = () => {
    const navigate = useNavigate();

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
                <img src={logo} alt="logo" className="logo" />
                    <div className="logo-title">
                        <h1>
                            floW-stAte
                        </h1>
                    </div>

                    <h1 className="new-card-title">New Password</h1>
                    <form className="new-form">
                        <input type="text" placeholder="New Password" className="new-input" />
                        <input type="text" placeholder="Confirm Password" className="new-input" />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className="reset-eye-icon"
                        />
                        <button className="new-button" onClick={handleLogin} >
                            Reset Password
                        </button>
                    </form>
                </div>
                
            </div>
        </motion.div>
    )
}

export default React.memo(NewPassword)