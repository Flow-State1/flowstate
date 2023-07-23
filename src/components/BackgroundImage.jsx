import React, {useEffect, useState} from "react";
import bgImg from "../assets/bgImg.jpg";
import { motion } from "framer-motion";
import '../pages/styles.css'
import SideBarNavigation from "./SIdeBar";   
import HamburgerMenu from "./HamburgerMenu";

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

    //Hiding side bar when screensize below 800px
    
    const [screenW, setScreenW] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {

            setScreenW(window.innerWidth);

        }
        window.addEventListener('resize', handleResize)
    })

    return (
        <>
            <BackgroundImage />
            {screenW < 800 ? <HamburgerMenu/> : <SideBarNavigation /> }
            { children }
        </>
    );
}

export default React.memo(LayoutDashboard)