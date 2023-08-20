import React from 'react'
import PageRoutes from './pages/PageRoutes'
import DashboardRoutes from './pages/dashboard/DashboardRoutes'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, AppContextProvider } from './context/AppContext'

function App() {

  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/*" element={<PageRoutes />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </AppContextProvider>
    </>
  )
}

export default App;