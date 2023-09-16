import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'

const ChangePassword = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSaveChanges = () => {
        navigate('/dashboard/dashboard/profile')
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
                    <h2>Change Password</h2>
                </div>

                <div className='profile-content-body'>
                    <div className='profile-content-body-card'>
                        <div className='profile-content-body-card-head'>
                            <div className="profile-profile-avatar">
                            <img 
                                src="https://www.w3schools.com/howto/img_avatar.png" 
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

                            <div className='profile-edit-details'>
                                
                                <form className='profile-edit-details-form'>
                                    <input className='profile-edit-details-form-input' type={passwordVisible ? 'text' : 'password'} placeholder='Current Password' />
                                    <input type={passwordVisible ? 'text' : 'password'} className='profile-edit-details-form-input' placeholder='New Password' />
                                    <input type={passwordVisible ? 'text' : 'password'} className='profile-edit-details-form-input' placeholder='Confirm Password' />
                                    <FontAwesomeIcon 
                                        icon={passwordVisible ? faEye : faEyeSlash}
                                        className="eye-icon"
                                        onClick={togglePasswordVisibility}
                                        style={{ 
                                            cursor: 'pointer',
                                            position: 'relative',
                                            top: '-2.9rem',
                                            width: '1.5rem',
                                            height: '1.5rem',
                                        }}
                                    />

                                    <button className='profile-edit-details-form-button' onClick={handleSaveChanges} >Save Changes</button>
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

export default React.memo(ChangePassword)