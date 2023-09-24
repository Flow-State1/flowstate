import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import '../styles.css';
import { AppContext } from '../../context/AppContext';

const Profile = () => {

    const {user, profilePictureURL} = useContext(AppContext);
    const userName = user ? user.name : ' ';
    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const handleEditProfile = () => {
        navigate('/dashboard/dashboard/profile/editprofile')
    }

    const handleChangePassword = () => {
        navigate('/dashboard/dashboard/profile/changepassword')
    }

    const handleViewProfile = () => {
        navigate('/dashboard/dashboard/profile/viewprofile')
    }
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-content-header'>
                    <h2>Profile</h2>
                </div>

                <div className='profile-content-body'>
                    <div className='profile-content-body-card'>
                        <div className='profile-content-body-card-header'>
                            <div className="profile-profile-avatar">
                                <img 
                                    src={profilePictureURL ? `http://localhost:3001/users/uploads/profile-pictures/${profilePictureURL}` : 'https://www.w3schools.com/howto/img_avatar.png'}
                                    alt=""                                    
                                    style={{
                                        width: '12rem',
                                        height: '12rem',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        position: 'relative',
                                        top: '75%',
                                    }}
                                />
                            </div>

                            <div className='profile-content-body-card-header-name'>
                                <h2>{userName}</h2>
                            </div>
                        </div>

                        <div className='profile-content-body-card-buttons'>
                            <button 
                                className='profile-content-body-card-button' 
                                onClick={handleEditProfile} 
                                style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            >
                                Edit Profile
                            </button>
                            <button 
                                className='profile-content-body-card-button' 
                                onClick={handleChangePassword} 
                                style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            >
                                Change Password
                            </button>
                            <button 
                                className='profile-content-body-card-button' 
                                onClick={handleViewProfile} 
                                style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default React.memo(Profile)