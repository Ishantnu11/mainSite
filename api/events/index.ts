import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../lib/mongodb';
import Event, { IEvent } from '../../models/Event';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log(`[API] ${req.method} /api/events - Starting request`);
  
  try {
    console.log('[API] Connecting to MongoDB...');
    await dbConnect();
    console.log('[API] Connected to MongoDB successfully');

    switch (req.method) {
      case 'GET':
        console.log('[API] Fetching events...');
        const events = await Event.find({}).sort({ date: 1 }).lean().exec();
        console.log(`[API] Found ${events.length} events`);
        res.status(200).json(events);
        break;

      case 'POST':
        console.log('[API] Creating new event...');
        const eventData = req.body as Partial<IEvent>;
        const newEvent = new Event({
          title: eventData.title,
          date: new Date(eventData.date!),
          description: eventData.description,
          image: eventData.image,
          link: eventData.link,
          status: eventData.status || 'upcoming'
        });
        await newEvent.save();
        console.log('[API] Event created successfully');
        res.status(201).json(newEvent);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('[API] Error in events API:', error);
    // More detailed error response
    res.status(500).json({
      error: 'Failed to process request',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 