import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css"

const Splash = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleSignUp = () => {
        navigate("/signup");
    }
    return (
        <motion.div 
            className="splash-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            >
            <div className="splash-content">
                <h1>
                    Welcome 
                    <br /> 
                    <span className="splashTextSpan">To</span> 
                    <br />
                    <span className="splashTextSpan">floW-stAte</span>
                </h1>
            </div>

            <div className="button-container">
                <button className="segmented-button left" onClick={handleLogin}>
                    Login
                </button>

                <button className="segmented-button right" onClick={handleSignUp} >
                    Sign Up
                </button>
            </div>
        </motion.div>
    );
}

export default React.memo(Splash)