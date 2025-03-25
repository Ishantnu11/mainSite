import express, { Request, Response, Router } from 'express';
import { News } from '../../models/News';
import dbConnect from '../../lib/mongodb';

const router = Router();

// GET /api/news
router.get('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 GET /api/news - Processing request');

    const news = await News.find().sort({ date: -1 });
    console.log(`✅ Successfully fetched ${news.length} news items`);
    return res.json(news);
  } catch (error) {
    console.error('❌ Error in news API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/news
router.post('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 POST /api/news - Processing request');

    const newNews = new News({
      ...req.body,
      date: new Date(req.body.date)
    });
    await newNews.save();
    console.log(`✅ Successfully created new news item: ${newNews.title}`);
    return res.json(newNews);
  } catch (error) {
    console.error('❌ Error in news API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// DELETE /api/news/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log(`📨 DELETE /api/news/${req.params.id} - Processing request`);

    await News.findByIdAndDelete(req.params.id);
    console.log(`✅ Successfully deleted news item with ID: ${req.params.id}`);
    return res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('❌ Error in news API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 