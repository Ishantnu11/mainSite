import mongoose from 'mongoose';
import { News } from '../models/schema.js';
import connectDB from '../utils/mongodb.js';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const news = await News.find({});
        res.status(200).json(news);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
      }
      break;

    case 'POST':
      try {
        const newsItem = await News.create(req.body);
        res.status(201).json(newsItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create news item' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await News.findByIdAndDelete(id);
        res.status(200).json({ message: 'News item deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete news item' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 