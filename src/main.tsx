import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
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
    }
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Roboto, sans-serif',
      }
    }
  }
})

// Add Google Fonts
const googleFonts = document.createElement('link')
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
googleFonts.rel = 'stylesheet'
document.head.appendChild(googleFonts)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
