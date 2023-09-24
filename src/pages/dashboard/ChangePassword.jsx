import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const ChangePassword = () => {
  
    const {
        HandlePasswordChange, 
        updateOnChange, 
        passwordInput,
        passwordVisible,
        isErrorVisible,
        errorMessage,
        setIsErrorVisible,
        togglePasswordVisibility,
        isLoading,
        isTabletOrLaptop
    } = useContext(AppContext);
    
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
                                
                                <form className='profile-edit-details-form' onSubmit={HandlePasswordChange}>
                                    <input 
                                        className='profile-edit-details-form-input' 
                                        type={passwordVisible ? 'text' : 'password'} 
                                        placeholder='Current Password'
                                        name="currentPassword"
                                        value={passwordInput.currentPassword}
                                        onChange={updateOnChange}
                                    />
                                    <input 
                                        type={passwordVisible ? 'text' : 'password'} 
                                        className='profile-edit-details-form-input' 
                                        placeholder='New Password'
                                        name="password"
                                        value={passwordInput.password}
                                        onChange={updateOnChange}
                                    />
                                    <input 
                                        type={passwordVisible ? 'text' : 'password'} 
                                        className='profile-edit-details-form-input' 
                                        placeholder='Confirm Password'
                                        name="confirmPassword"
                                        value={passwordInput.confirmPassword}
                                        onChange={updateOnChange}
                                    />
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

                                    {isErrorVisible && (
                                        <div className="error-message">
                                            <span>{errorMessage}</span>
                                            <button className="close-button" onClick={() => setIsErrorVisible(false)}>
                                            &#x2716; {/* Unicode character for '✖' */}
                                            </button>
                                        </div>
                                    )}

                                    <button 
                                        className='profile-edit-details-form-button' 
                                        type='submit'
                                        style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Save Changes'}
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

export default React.memo(ChangePassword)