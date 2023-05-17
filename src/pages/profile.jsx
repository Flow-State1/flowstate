import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import NavSideBarComponent from "../components/nav-side-bar";

const Profile = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    const handleEditProfile = () => {
        navigate('/edit-profile');
    }
    return(
        <div className="container-profile">
            <NavSideBarComponent />

            <div className="main-content-card">
                <div className="main-content-card-item">
                    <h1>Profile</h1>
                </div>

                <div className="profile-card">
                    <div className="profile-card-avatar">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                    </div>

                    <div className="profile-card-name">
                        <h1>Andre</h1>
                    </div>

                    <div className="profile-buttons">
                        <button className="profile-button" onClick={handleEditProfile} >Edit Profile</button>
                        <button className="profile-button">Change Password</button>
                        <button className="profile-button">Information</button>
                        <button className="profile-button" onClick={handleLogout} >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;