import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import SignUp from '../pages/SignUp.jsx'
import Landing from '../pages/Landing.jsx'
import Home from '../pages/Home.jsx'
import { AuthProvider } from '../context/authContext.jsx'
import PublicRoute from '../components/PublicRoute.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
