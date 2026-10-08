import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

export default function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* App shell — reusable empty content container for future modules */}
      <Route path="/app/*" element={<MainLayout />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
