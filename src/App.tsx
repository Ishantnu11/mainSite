import { Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'
import Team from './pages/Team'
import News from './pages/News'
import Login from './pages/Login'
import Admin from './pages/Admin'
import TPO from './pages/TPO'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box 
          sx={{
            minHeight: '100vh',
            width: '100vw',
            bgcolor: '#fafafa',
            color: '#1a1a1a',
            overflowX: 'hidden',
            position: 'relative',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {/* Content */}
          <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box 
              component="main"
              sx={{
                flex: 1,
                width: '100%',
                maxWidth: '100vw',
                mx: 'auto'
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/team" element={<Team />} />
                <Route path="/news" element={<News />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/tpo" element={<TPO />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  )
}

export default App
