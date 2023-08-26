<<<<<<< HEAD
import React, { useMemo } from 'react'
import PageRoutes from './pages/PageRoutes'
import DashboardRoutes from './pages/dashboard/DashboardRoutes'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<PageRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </>
  )
}

export default App;
=======
import Splash from './pages/splash'
import Analytics from './pages/analytics'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import ResetPassword from './pages/reset-password'
import NewPassword from './pages/new-password'
import Profile from './pages/profile'
import EditProfile from './pages/edit-profile'
import Notifications from './pages/notifications'
import Dashboard from './pages/dashboard'
import { Route, Routes } from 'react-router-dom'
import LoadingScreen from './components/loadingScreen'
import LoadingCard from './components/loadingCard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/new-password' element={<NewPassword />} />
        <Route path='/profile' element={<Profile />} /> 
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/loading' element={<LoadingScreen />} />
        <Route path='loading-card' element={<LoadingCard />} />
      </Routes>
    </>
    )
}

export default App
>>>>>>> 2b063adaf8e762d967656e322c4caab72a10da82
