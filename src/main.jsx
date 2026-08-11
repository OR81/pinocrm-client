import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './app.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme'
import { AuthProvider } from './auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)