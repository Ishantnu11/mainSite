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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box minH="100vh" w="100vw" bg="gray.50" overflowX="hidden">
          <Navbar />
          <Box as="main" w="full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  )
}

export default App
