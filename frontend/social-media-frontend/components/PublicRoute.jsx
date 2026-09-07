import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  const {user, loader} = useAuth()
  if (loader) {
    return <h1>Loading...</h1>
  }
  if (user) {
    return <Navigate to="/home" replace />
  } 
  return children
}

export default PublicRoute