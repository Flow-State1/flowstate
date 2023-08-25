import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBell, faGears, faUserCircle, faLayerGroup, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png";
import "../pages/styles.css"
import HamburgerMenu from "./HamburgerMenu";
import { AppContext } from "../context/AppContext";

const SideBarNavigation = () => {
    const navigate = useNavigate()

    const {user} = useContext(AppContext);

    const handleLogout = () => {
        navigate('/')
    }
    const location = useLocation();


    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <motion.div
            className="side-bar-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='navbar'  >

                <div className='navbar-right-profile'>

                    <div className='navbar-profile-avatar'>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                    </div>


                    <div className='navbar-profile-info'>
                        <h4 className='navbar-profile-name-title'
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                marginBottom: '0.1rem'
                            }}
                        >
                            Andre
                        </h4>
                    </div>


                </div>
            </div>
            <div>
            </div>


            <div className="sidebar">
                <div className='sidebar-header'>
                    <img src={logo} alt='logo' className='sidebar-logo' />
                    <h1 className='sidebar-title'>Flow State</h1>
                </div>

                <div className='sidebar-menu'>
                    <ul className='sidebar-list'>
                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/dashboard') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/dashboard' className='sidebar-link active'>
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />Dashboard
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/analytics') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/analytics' className='sidebar-link'>
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />
                                Analytics
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/analytics') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/report' className='sidebar-link'>
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />
                                Report
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/notifications') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/notifications' className='sidebar-link'>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />Notifications
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/settings') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/settings' className='sidebar-link'>
                                <FontAwesomeIcon
                                    icon={faGears}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />Settings
                            </Link>
                        </li>

                        <li className={`sidebar-list-item ${isActiveLink('/dashboard/dashboard/profile') ? 'active' : ''}`}>
                            <Link to='/dashboard/dashboard/profile' className='sidebar-link'>
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="icon"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginRight: '1.5rem',
                                    }}

                                />Profile
                            </Link>
                        </li>
                    </ul>
                    <div className='sidebar-logout'>
                        <button className='sidebar-logout-btn' onClick={handleLogout}>
                            <FontAwesomeIcon
                                icon={faSignOut}
                                className="icon"
                                style={{
                                    fontSize: '1.5rem',
                                    color: '#fff',
                                    marginRight: '1rem'
                                }}
                            />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default React.memo(SideBarNavigation);