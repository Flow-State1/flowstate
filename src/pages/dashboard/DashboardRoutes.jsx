import React from 'react'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LayoutDashboard from '../../../src/components/BackgroundImage'
import Analytics from './Analytics'
import Dashboard from './Dashboard'
import Notifications from './Notifications'
import Settings from './Settings'
import Profile from './Profile'
import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'
import ChangePassword from './ChangePassword'

const DashboardRoutes = () => {
    const path = useLocation();

    //Instance of the WebSocket
    const socket = new WebSocket("ws://localhost:3001");

    setInterval(() => {
            // if(socket.readyState ===WebSocket.OPEN){
            
            // }
            socket.send('Send me messages');
    }, 10000);

    return(
        <AnimatePresence mode='sync'>
            <LayoutDashboard>
                <Routes location={path} key={path.pathname}>
                    <Route path="/dashboard/dashboard" element={<Dashboard WebSocket={socket} />} />
                    <Route path="/dashboard/analytics" element={<Analytics />} />
                    <Route path="/dashboard/notifications" element={<Notifications />} />
                    <Route path="/dashboard/settings" element={<Settings />} />
                    <Route path="/dashboard/profile" element={<Profile />} />
                    <Route path="/dashboard/profile/editprofile" element={<EditProfile />} />
                    <Route path="/dashboard/profile/viewprofile" element={<ViewProfile />} />
                    <Route path="/dashboard/profile/changepassword" element={<ChangePassword />} />
                </Routes>
            </LayoutDashboard>
        </AnimatePresence>
    )
}


export default React.memo(DashboardRoutes)