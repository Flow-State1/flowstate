import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import '../styles.css'
import { useTheme } from '../../context/ThemeContext'

const Notifications = () => {
    const { theme } = useTheme();
    const [selectedId, setSelectedId] = useState(null)
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className={`notifications ${theme}`}
        >
        <div className='notifications-container'>

            <div className='notifications-content'>
                <div className='notifications-content-header'>
                    <h2>Notifications</h2>
                </div>

                <div className='notifications-content-body'>
                    <div className='notifications-content-body-card main-card'>
                        <div className='notifications-content-body-card-header'>
                            <div className="notifications-profile-avatar">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>

                            <div className='notifications-content-body-card-header-text'>
                                <p>
                                    Andre, only 80% of your notifications have been read.<br/> Please read the rest of your notifications.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='notifications-content-pane-card'>
                        <div className='notifications-content-pane-card-header'>
                            <h3>All Notifications</h3>
                        </div>

                        <div className='notifications-content-pane-card-body'>
                            <div className='notifications-content-pane-card-body-card-1'>
                                <div className='notifications-content-pane-card-body-item-text'>
                                    <p className='notifications-content-pane-card-message'>
                                        Hello Andre, the boilers are using up too much electricity. Please turn them off.
                                    </p>

                                    <p className='notifications-content-pane-card-date'>
                                        2 hours ago
                                    </p>
                                </div>
                            </div>

                            <div className='notifications-content-pane-card-body-card-2'>
                                <div className='notifications-content-pane-card-body-item-text'>
                                    <p className='notifications-content-pane-card-message'>
                                        Time to top up your weekly electricity.
                                    </p>

                                    <p className='notifications-content-pane-card-date'>
                                        5 April 2023
                                    </p>                                    
                                </div>
                            </div>

                            <div className='notifications-content-pane-card-body-card-3'>
                                <div className='notifications-content-pane-card-body-item-text'>
                                    <p className='notifications-content-pane-card-message'>
                                        Residents have maintained responsible use of electricity this week. 
                                    </p>

                                    <p className='notifications-content-pane-card-date'>
                                        20 April 2023
                                    </p>
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

export default React.memo(Notifications)