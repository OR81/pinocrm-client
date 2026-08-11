import { createContext, useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pino.user'))
    } catch {
      return null
    }
  })

  const login = (u, token) => {
    localStorage.setItem('pino.user', JSON.stringify(u))
    localStorage.setItem('pino.token', token)
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('pino.user')
    localStorage.removeItem('pino.token')
    setUser(null)
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)

export function RequireRole({ role, children }) {
  const { user } = useAuth()
  const loc = useLocation()

  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if (user.role !== role) return <Navigate to="/dashboard/student" replace />

  return children
}