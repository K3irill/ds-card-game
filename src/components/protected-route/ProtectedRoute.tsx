import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  isAllowed: boolean
  redirectTo: string
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectTo,
  children,
}) => {
  return isAllowed ? <>{children}</> : <Navigate to={redirectTo} />
}

export default ProtectedRoute
