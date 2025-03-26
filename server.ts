import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/mongodb';
import eventsRouter from './api/events';
import newsRouter from './api/news';
import teamRouter from './api/team';

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

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB successfully');

    // API Routes
    app.use('/api/events', eventsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/team', teamRouter);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
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

    // Start server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log('Available API endpoints:');
      console.log('- GET /api/events');
      console.log('- GET /api/news');
      console.log('- GET /api/team');
      console.log('- GET /api/health');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    console.log('Tips for troubleshooting:');
    console.log('1. Check if MONGODB_URI is correctly set in your environment');
    console.log('2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify the database user has correct permissions');
    process.exit(1);
  });

export default app;
