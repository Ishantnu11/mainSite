import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import route handlers
import eventsRouter from './api/events/index.js';
import newsRouter from './api/news/index.js';
import teamRouter from './api/team/index.js';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Updated CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: err.message });
});

app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve assets directory for images
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Use environment variable for MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  process.exit(1);
}

// Log the MongoDB connection string (without credentials)
const sanitizedUri = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/[^:]+:[^@]+@/,
  'mongodb$1://****:****@'
);
console.log('🔌 Attempting to connect to MongoDB:', sanitizedUri);

// Enhanced MongoDB connection handling
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Connected to database: ${mongoose.connection.name}`);
  console.log(`🖥️ Database host: ${mongoose.connection.host}`);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  console.log('💡 Tips:');
  console.log('  1. Check if your MongoDB URI is correct');
  console.log('  2. Ensure MongoDB is running');
  console.log('  3. Check if IP whitelist includes your current IP');
  console.log('  4. Verify database user credentials');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

// Connect to MongoDB with enhanced error handling
try {
  console.log('🔄 Initializing MongoDB connection...');
  await mongoose.connect(MONGODB_URI, {
    dbName: 'gdg-gug',
  });
} catch (err) {
  console.error('❌ Failed to connect to MongoDB:', err);
  console.log('💡 Debug information:');
  console.log('  - Error name:', err.name);
  console.log('  - Error code:', err.code);
  console.log('  - Error message:', err.message);
  process.exit(1);
}

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/news', newsRouter);
app.use('/api/team', teamRouter);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 Server is running on port ${PORT}
📱 API endpoints available at:
   - /api/events
   - /api/news
   - /api/team
  `);
});

export default app;
