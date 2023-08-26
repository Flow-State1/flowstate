import React from "react";
import logo from "../assets/flow-state-logo.png";
import "../pages/styles.css";

const NavSideBarComponent = () => {
    return(
        <div>
            <div className="nav-bar">
                <div className="logo">
                    <img src={logo} alt="" />

                    <h1 className="logo-title" >floW-stAte</h1>
                </div>

                <div className="profile">
                    <div className="profile-avatar">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                    </div>

                    <div className="profile-name">
                        <h1>Andre</h1>
                    </div>
                </div>
            </div>

            <div className="side-nav-bar">
                <div className="top-logo">
                    <img src={logo} alt="" className="corner-logo-img"/>
                </div>
                <div className="side-nav-bar-item">
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/notifications">Notfications</a></li>
                        <li><a href="/analytics">Analytics</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavSideBarComponent;