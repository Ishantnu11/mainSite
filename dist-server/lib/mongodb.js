import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
const MONGODB_URI = process.env.MONGODB_URI;
// Log the MongoDB connection string (without credentials)
const sanitizedUri = MONGODB_URI.replace(/mongodb(\+srv)?:\/\/[^:]+:[^@]+@/, 'mongodb$1://****:****@');
console.log('🔌 Attempting to connect to MongoDB:', sanitizedUri);
const cached = global.mongoose || { conn: null, promise: null };
if (!global.mongoose) {
    global.mongoose = cached;
}
export async function connectToDatabase() {
    if (cached.conn) {
        console.log('✅ Using cached MongoDB connection');
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        console.log('🔄 Initializing new MongoDB connection...');
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB connected successfully');
            console.log(`📊 Connected to database: ${mongoose.connection.name}`);
            console.log(`🖥️ Database host: ${mongoose.connection.host}`);
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    }
    catch (e) {
        cached.promise = null;
        console.error('❌ MongoDB connection error:', e);
        console.log('💡 Tips:');
        console.log('  1. Check if your MongoDB URI is correct');
        console.log('  2. Ensure MongoDB is running');
        console.log('  3. Check if IP whitelist includes your current IP');
        console.log('  4. Verify database user credentials');
        throw e;
    }
    return cached.conn;
}
// Add event listeners for connection status
mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});
mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
});
