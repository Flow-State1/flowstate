import React from "react";
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import '../styles.css'

const ViewProfile = () => {
    const navigate = useNavigate()

    const handleBack = () => {
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
                    <h2>View Profile</h2>
                </div>

                <div className='profile-content-body'>
                    <div className='profile-content-body-card'>
                        <div className='profile-content-body-card-header'>
                            <div className="profile-profile-avatar">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""
                                    style={{
                                        width: '25em',
                                        height: '25rem',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        position: 'relative',
                                        top: '70%',
                                    }}
                                />

                                <div className="view-profile-details">
                                    <div className="view-profile-details-item">
                                        <h3>Name</h3>
                                        <p>Andre</p>

                                        <h3>Email</h3>
                                        <p>andre@gmail.com</p>

                                        <h3>Password</h3>
                                        <p>********</p>
                                    </div>

                                    <div className='profile-content-body-card-button'>
                                        <button onClick={handleBack} >Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default React.memo(ViewProfile);