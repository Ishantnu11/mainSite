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
          bg="black" 
          color="white"
          overflowX="hidden"
          position="relative"
        >
          {/* Background gradient effects */}
          <Box
            position="fixed"
            top="0"
            right="0"
            width="100%"
            height="100%"
            background="radial-gradient(circle at top right, rgba(255, 0, 128, 0.1), transparent 50%)"
            filter="blur(100px)"
            zIndex={0}
            pointerEvents="none"
          />
          <Box
            position="fixed"
            bottom="0"
            left="0"
            width="100%"
            height="100%"
            background="radial-gradient(circle at bottom left, rgba(0, 112, 243, 0.1), transparent 50%)"
            filter="blur(100px)"
            zIndex={0}
            pointerEvents="none"
          />
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="100%"
            height="100%"
            background="radial-gradient(circle at center, rgba(80, 227, 194, 0.05), transparent 60%)"
            filter="blur(100px)"
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
              maxW="1400px"
              mx="auto"
              px={{ base: 4, md: 8 }}
              py={{ base: 6, md: 12 }}
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
