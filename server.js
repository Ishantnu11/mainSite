import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://rghv064:kronos@cluster0.n2fva.mongodb.net/yourdbname?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  image: String,
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

// Define routes

// Events
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
});

app.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted successfully' });
});

// News
app.get('/news', async (req, res) => {
  const news = await News.find();
  res.json(news);
});

app.post('/news', async (req, res) => {
  const newNews = new News(req.body);
  await newNews.save();
  res.json(newNews);
});

app.delete('/news/:id', async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'News item deleted successfully' });
});

// Team Members
app.get('/team-members', async (req, res) => {
  const teamMembers = await TeamMember.find();
  res.json(teamMembers);
});

app.post('/team-members', async (req, res) => {
  const newTeamMember = new TeamMember(req.body);
  await newTeamMember.save();
  res.json(newTeamMember);
});

app.delete('/team-members/:id', async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team member deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
