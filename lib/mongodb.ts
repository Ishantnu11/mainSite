import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithMongoose;

// Initialize global mongoose state
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (global.mongoose.conn) {
    console.log('🔄 Using existing MongoDB connection');
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    console.log('🔌 Creating new MongoDB connection...');
    
    const opts = {
      bufferCommands: true,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }
}

// Listen for connection events
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected event fired'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error event:', err));
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected event fired'));
mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected event fired'));

export default dbConnect; 