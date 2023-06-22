import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import '../styles.css'

const Settings = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [theme, setTheme] = useState('light');
  
    React.useEffect(() => {
      const pathname = location.pathname;
      if (pathname === '/settings/dark') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }, [location]);
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const [notificationPreference, setNotificationPreference] = useState('email')

    const toggleNotificationPreference = (e) => {
        setNotificationPreference(e.target.value)
    }

    const handleNotificationPreferenceChange = (e) => {
        setNotificationPreference(e.target.value)
    }
  

    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`settings-container ${theme === 'dark' ? 'dark-theme' : ''}`}
        >
          <div className='settings-container'>
            <div className='settings-content'>
              <div className='settings-content-header'>
                <h2>Settings</h2>
              </div>
    
              <div className='settings-content-body'>
                <div className='settings-section'>
                  <h3>Theme</h3>
                  <div className='theme-options'>
                    <label className={`theme-option ${theme === 'light' ? 'active' : ''}`}>
                      <input
                        type='radio'
                        value='light'
                        checked={theme === 'light'}
                        onChange={toggleTheme}
                      />
                      Light Mode
                    </label>
                    <label className={`theme-option ${theme === 'dark' ? 'active' : ''}`}>
                      <input
                        type='radio'
                        value='dark'
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                      />
                      Dark Mode
                    </label>
                  </div>
                </div>

                <br />

                <div className='settings-section'>
                  <h3>Notifications Preference</h3>
                  <div className='notification-options'>
                    <label
                      className={`notification-option ${notificationPreference === 'email' ? 'active' : ''}`}
                    >
                      <input
                        type='radio'
                        value='email'
                        checked={notificationPreference === 'email'}
                        onChange={handleNotificationPreferenceChange}
                      />
                      Email
                    </label>
                    <label
                      className={`notification-option ${notificationPreference === 'sms' ? 'active' : ''}`}
                    >
                      <input
                        type='radio'
                        value='sms'
                        checked={notificationPreference === 'sms'}
                        onChange={handleNotificationPreferenceChange}
                      />
                      SMS
                    </label>
                    <label
                      className={`notification-option ${notificationPreference === 'none' ? 'active' : ''}`}
                    >
                      <input
                        type='radio'
                        value='none'
                        checked={notificationPreference === 'none'}
                        onChange={handleNotificationPreferenceChange}
                      />
                      None
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
}

export default React.memo(Settings)