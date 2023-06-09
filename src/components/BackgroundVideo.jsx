import React from "react";
import bgVideo from "../assets/bgVideo.mp4";
import { motion } from "framer-motion";
import '../pages/styles.css'

const BackgroundVideo = () => {
    return (
        <motion.div 
            className="backgroundContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
        <video autoPlay muted loop>
            <source src={ bgVideo } type="video/mp4" />
            Your browser is not supported!
        </video>
        </motion.div>
    );
}

const Layout = ({ children }) => {
    return (
        <>
            <BackgroundVideo />
            {children}
        </>
    );
}

export default React.memo(Layout)