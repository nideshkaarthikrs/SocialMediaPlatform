import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user, loader} = useAuth()
    if (loader) {
        return <h1>Loading...</h1>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}


export default ProtectedRoute