import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import './index.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  colors: {
    vercel: {
      pink: '#FF0080',
      blue: '#0070F3',
      cyan: '#50E3C2',
      orange: '#F5A623',
      violet: '#7928CA',
    },
    gray: {
      50: '#fafafa',
      100: '#eaeaea',
      200: '#999999',
      300: '#888888',
      400: '#666666',
      500: '#444444',
      600: '#333333',
      700: '#222222',
      800: '#111111',
      900: '#000000',
    }
  },
  styles: {
    global: {
      'html, body': {
        bg: 'black',
        color: 'white',
        lineHeight: 'tall',
        scrollBehavior: 'smooth',
        overflowX: 'hidden',
      },
      '::selection': {
        background: 'vercel.blue',
        color: 'white',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '1400px',
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'white',
          color: 'black',
          _hover: {
            bg: 'gray.100',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
        outline: {
          borderColor: 'gray.600',
          _hover: {
            bg: 'whiteAlpha.100',
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        ghost: {
          _hover: {
            bg: 'whiteAlpha.100',
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: 'vercel.blue',
        _hover: {
          textDecoration: 'none',
          opacity: 0.8,
        },
        transition: 'all 0.2s',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
        lineHeight: 'shorter',
      },
      sizes: {
        '2xl': {
          fontSize: ['4xl', '5xl', '6xl'],
          lineHeight: 1.2,
        },
        xl: {
          fontSize: ['3xl', '4xl', '5xl'],
          lineHeight: 1.2,
        },
        lg: {
          fontSize: ['2xl', '3xl', '4xl'],
          lineHeight: 1.2,
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.300',
        fontSize: 'lg',
        lineHeight: 'tall',
      },
    },
    Card: {
      baseStyle: {
        bg: 'gray.900',
        borderRadius: 'lg',
        borderWidth: '1px',
        borderColor: 'gray.800',
        overflow: 'hidden',
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
          borderColor: 'gray.700',
        },
      },
    },
  },
})

// Add Geist font
const style = document.createElement('style')
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  :root {
    --font-geist-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    --font-geist-mono: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace;
  }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

