import React, { useMemo } from 'react'
import PageRoutes from './pages/PageRoutes'
import DashboardRoutes from './pages/dashboard/DashboardRoutes'
import { Routes, Route } from 'react-router-dom'


function App() {

      //Instance of the WebSocket
      const socket = useMemo(()=>new WebSocket("ws://localhost:3001"),[]) 

      setInterval(() => {
              socket.send('Send me messages');
      }, 10000);

  return (
    <>
      <Routes>
        <Route path="/*" element={<PageRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes WebSocket={socket} />} />
      </Routes>
    </>
  )
}

export default App;