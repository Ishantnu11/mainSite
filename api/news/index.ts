import { Request, Response } from 'express';
import { News } from '../../models/News';
import dbConnect from '../../lib/mongodb';

export default async function handler(req: Request, res: Response) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await dbConnect();
    console.log(`📨 ${req.method} /api/news - Processing request`);

    switch (req.method) {
      case 'GET':
        const news = await News.find().sort({ date: -1 });
        console.log(`✅ Successfully fetched ${news.length} news items`);
        return res.json(news);

      case 'POST':
        const newNews = new News({
          ...req.body,
          date: new Date(req.body.date)
        });
        await newNews.save();
        console.log(`✅ Successfully created new news item: ${newNews.title}`);
        return res.json(newNews);

      case 'DELETE':
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        console.log(`✅ Successfully deleted news item with ID: ${id}`);
        return res.json({ message: 'News item deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Error in news API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 