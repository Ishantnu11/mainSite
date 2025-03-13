import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import './index.css'

const theme = extendTheme({
  fonts: {
    heading: '"Google Sans", sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    google: {
      blue: '#4285F4',
      red: '#DB4437',
      yellow: '#F4B400',
      green: '#0F9D58'
    },
    brand: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'full',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Roboto, sans-serif',
        lineHeight: 'tall',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: '"Google Sans", sans-serif',
      }
    }
  }
})

// Add Google Fonts
const googleFonts = document.createElement('link')
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Google+Sans:wght@400;500;700&display=swap'
googleFonts.rel = 'stylesheet'
document.head.appendChild(googleFonts)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
