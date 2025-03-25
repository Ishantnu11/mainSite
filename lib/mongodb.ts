import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: null | typeof mongoose; promise: null | Promise<typeof mongoose> };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error('❌ No MongoDB URI found in environment variables');
  throw new Error('Please add your MONGODB_URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  console.log('🔄 Initializing MongoDB connection cache');
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('🔄 Starting MongoDB connection process...');
  
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    console.log('🔄 Creating new MongoDB connection...');
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Connecting to: ${MONGODB_URI.split('@')[1]}`); // Log only the host part, not credentials

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🔌 Host: ${mongoose.connection.host}`);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  } else {
    console.log('⏳ Using existing connection promise');
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('❌ Failed to resolve MongoDB connection:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Listen for connection events
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected event fired'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error event:', err));
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected event fired'));
mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected event fired'));

export default dbConnect; 