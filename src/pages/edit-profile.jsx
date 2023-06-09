import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import NavSideBarComponent from "../components/nav-side-bar";

const EditProfile = () => {

    const navigate = useNavigate();

    const handleSave = () => {
        navigate('/profile');
    }
    return(
        <div className="container-profile">
            <NavSideBarComponent />

            <div className="main-content-card">
                <div className="main-content-card-item">
                    <h1>Edit Profile</h1>
                </div>

                <div className="profile-edit">
                    <div className="profile-edit-avatar">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                    </div>

                    <div className="profile-details">
                        <h1 className="profile-details-title">Profile Details</h1>

                        <form className="details-form">
                            <input type="text" className="edit-details-form-input" placeholder="Email"/>
                            <input type="text" className="edit-details-form-input" placeholder="Password"/>

                            <button className="edit-details-form-button" onClick={handleSave} >Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;