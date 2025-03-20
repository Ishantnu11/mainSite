import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Updated CORS configuration
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server
  'http://localhost:5000',  // Local backend
  'https://gdg-gug.vercel.app',  // Production URL
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null // Vercel preview deployments
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Use environment variable for MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rghv064:kronos@cluster0.n2fva.mongodb.net/yourdbname?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  image: String,
  link: String,
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'past'],
    default: 'upcoming'
  }
});

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  company: String,
  location: String,
  date: Date,
});

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
  twitter: String,
  github: String,
});

// Create models
const Event = mongoose.model('Event', eventSchema);
const News = mongoose.model('News', newsSchema);
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

// API Routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { title, date, description, image, link, status } = req.body;
    const newEvent = new Event({
      title,
      date: new Date(date),
      description,
      image,
      link,
      status: status || 'upcoming'
    });
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const newNews = new News(req.body);
    await newNews.save();
    res.json(newNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

app.get('/api/team-members', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

app.post('/api/team-members', async (req, res) => {
  try {
    const newTeamMember = new TeamMember(req.body);
    await newTeamMember.save();
    res.json(newTeamMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

app.delete('/api/team-members/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
