import { Box } from '@chakra-ui/react'
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
          minH="100vh" 
          w="100vw" 
          bg="white" 
          color="google.gray.900"
          overflowX="hidden"
          position="relative"
        >
          {/* Subtle gradient backgrounds */}
          <Box
            position="fixed"
            top="-10%"
            right="-10%"
            width="50%"
            height="50%"
            background="radial-gradient(circle at center, rgba(66, 133, 244, 0.08), transparent 70%)"
            filter="blur(60px)"
            zIndex={0}
            pointerEvents="none"
          />
          <Box
            position="fixed"
            bottom="-10%"
            left="-10%"
            width="50%"
            height="50%"
            background="radial-gradient(circle at center, rgba(52, 168, 83, 0.08), transparent 70%)"
            filter="blur(60px)"
            zIndex={0}
            pointerEvents="none"
          />
          
          {/* Content */}
          <Box position="relative" zIndex={1} minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box 
              as="main" 
              flex="1"
              w="100%"
              maxW="100vw"
              mx="auto"
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
