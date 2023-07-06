import React, { useMemo } from 'react'
import PageRoutes from './pages/PageRoutes'
import DashboardRoutes from './pages/dashboard/DashboardRoutes'
import { Routes, Route } from 'react-router-dom'

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