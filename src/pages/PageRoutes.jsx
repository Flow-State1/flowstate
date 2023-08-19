import React from 'react'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/BackgroundVideo'
import Splash from './Splash'
import Login from './Login'
import SignUp from './SignUp'
import ResetPassword from './ResetPassword'
import NewPassword from './NewPassword'

const PageRoutes = () => {
    
    const location = useLocation();

    return(
        <>
        <AnimatePresence mode="sync">
            <Layout>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Splash />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/resetpassword" element={<ResetPassword />} />
                <Route exact path="/newpassword" element={<NewPassword />} />
            </Routes>
            </Layout>
        </AnimatePresence>
        </>
    )
}

export default React.memo(PageRoutes)