import React, { useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import { faCamera, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'
import { AppContext } from '../../context/AppContext';

const EditProfile = () => {

    const {
        isTabletOrLaptop, 
        HandleSaveChanges, 
        handleInputChange, 
        email, 
        name, 
        updateInput, 
        selectedFile, 
        setSelectedFile, 
        handleFileChange,  
        handlePictureSubmit, 
        profilePictureURL
    } = useContext(AppContext);

    //Ref for the file input
    const fileInputRef = useRef(null);

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
                    <h2>Edit Profile</h2>
                </div>

                <div className='profile-content-body'>
                    <div className='profile-content-body-card'>
                        <div className='profile-content-body-card-head'>
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

                                <div className="profile-profile-avatar-camera">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faCamera}
                                        className="camera-icon"
                                        onClick={() => fileInputRef.current.click()}
                                    />
                                </div>
                                <button onClick={handlePictureSubmit} style={{marginBottom:'-25px'}}>Upload Image</button>                                  
                            </div>

                            <div className='profile-edit-details'>
                                <form className='profile-edit-details-form' onSubmit={HandleSaveChanges}>
                                    <input 
                                        className='profile-edit-details-form-input'
                                        name='name'
                                        type="text" 
                                        placeholder='name'
                                        onChange={handleInputChange}
                                        value={updateInput.name}
                                    />
                                    <input 
                                        className='profile-edit-details-form-input' 
                                        name='email'
                                        type='email' 
                                        placeholder='email'
                                        onChange={handleInputChange}
                                        value={updateInput.email}
                                    />
                                    <button 
                                        className='profile-edit-details-form-button' 
                                        style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                                    >
                                        Save Changes
                                    </button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </motion.div>
    )
}

export default React.memo(EditProfile)