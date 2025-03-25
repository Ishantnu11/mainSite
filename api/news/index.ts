import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../lib/mongodb';
import News from '../../models/News';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        const news = await News.find().sort({ date: -1 });
        res.status(200).json(news);
        break;

      case 'POST':
        const { title, description, type, company, location, date } = req.body;
        const newNews = new News({
          title,
          description,
          type,
          company,
          location,
          date: new Date(date)
        });
        await newNews.save();
        res.status(201).json(newNews);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in news API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
} 