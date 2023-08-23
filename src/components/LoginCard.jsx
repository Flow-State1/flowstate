import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../pages/styles.css"

const LoginCard = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            navigate("/login");             
        }, 6000);
    },[])

    return (
        <motion.div 
            className="splash-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            >
            <div className="splash-content">
                <p>You are not logged in. Note that you must log in before accessing the services of the platform</p>
                <p>You will be redirected to the Login Page shortly</p>
            </div>
        </motion.div>
    );
}

export default React.memo(LoginCard)