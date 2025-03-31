import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://gdg-gug.vercel.app', 'https://gdg-gug-website.onrender.com', 'http://localhost:5173'] 
    : ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Setup proxy to Render backend
const RENDER_API_URL = 'https://gdggug-backend.onrender.com';

// Proxy all API requests to the Render backend
app.use('/api', createProxyMiddleware({
  target: RENDER_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api' // Keep the /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request to: ${RENDER_API_URL}${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist directory
  app.use(express.static('dist'));
  
  // For any request that doesn't match an API route or static file, serve index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile('index.html', { root: 'dist' });
    }
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log('Available API endpoints:');
  console.log('- GET /api/events (proxied to Render backend)');
  console.log('- GET /api/news (proxied to Render backend)');
  console.log('- GET /api/team (proxied to Render backend)');
  console.log('- GET /health (local health check)');
});

export default app;
