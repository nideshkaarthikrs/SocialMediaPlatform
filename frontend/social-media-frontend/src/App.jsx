import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import SignUp from '../pages/SignUp.jsx'
import Landing from '../pages/Landing.jsx'
import Home from '../pages/Home.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import PublicRoute from '../components/PublicRoute.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Profile from '../pages/Profile.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
