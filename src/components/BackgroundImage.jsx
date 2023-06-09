import React from "react";
import bgImg from "../assets/bgImg.jpg";
import { motion } from "framer-motion";
import '../pages/styles.css'
import SideBarNavigation from "./SIdeBar";

const BackgroundImage = () => {
    return (
        <motion.div 
            className="backgroundContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            <div className="wrapper">
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </motion.div>
    );
}

const LayoutDashboard = ({ children }) => {
    return (
        <>
            <BackgroundImage />
            <SideBarNavigation />
            { children }
        </>
    );
}

export default React.memo(LayoutDashboard)