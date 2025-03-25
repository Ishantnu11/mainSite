import { Request, Response } from 'express';
import { Event } from '../../models/Event';
import dbConnect from '../../lib/mongodb';

export default async function handler(req: Request, res: Response) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await dbConnect();
    console.log(`📨 ${req.method} /api/events - Processing request`);

    switch (req.method) {
      case 'GET':
        const events = await Event.find().sort({ date: 1 });
        console.log(`✅ Successfully fetched ${events.length} events`);
        return res.json(events);

      case 'POST':
        const newEvent = new Event({
          ...req.body,
          date: new Date(req.body.date)
        });
        await newEvent.save();
        console.log(`✅ Successfully created new event: ${newEvent.title}`);
        return res.json(newEvent);

      case 'DELETE':
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        console.log(`✅ Successfully deleted event with ID: ${id}`);
        return res.json({ message: 'Event deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Error in events API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 