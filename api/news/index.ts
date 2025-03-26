import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Define News Schema
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['announcement', 'event', 'blog', 'other']
  },
  company: String,
  location: String,
  date: { type: Date, default: Date.now },
  link: String,
  image: String
}, {
  timestamps: true
});

// Create News Model (only if it doesn't exist)
const News = mongoose.models.News || mongoose.model('News', newsSchema);

// GET all news items
router.get('/', async (req, res) => {
  try {
    console.log('📥 Fetching all news items...');
    const news = await News.find().sort({ date: -1 });
    console.log(`✅ Successfully fetched ${news.length} news items`);
    res.json(news);
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// POST new news item
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new news item:', req.body);
    const newsItem = new News(req.body);
    await newsItem.save();
    console.log('✅ News item created successfully:', newsItem._id);
    res.status(201).json(newsItem);
  } catch (error) {
    console.error('❌ Error creating news item:', error);
    res.status(400).json({ error: 'Failed to create news item' });
  }
});

// DELETE news item
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting news item:', req.params.id);
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      console.log('❌ News item not found');
      return res.status(404).json({ error: 'News item not found' });
    }
    console.log('✅ News item deleted successfully');
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting news item:', error);
    res.status(500).json({ error: 'Failed to delete news item' });
  }
});

export default router; 