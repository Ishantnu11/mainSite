import express, { Request, Response, Router } from 'express';
import { Event } from '../../models/Event';
import dbConnect from '../../lib/mongodb';

const router = Router();

// GET /api/events
router.get('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 GET /api/events - Processing request');

    const events = await Event.find().sort({ date: 1 });
    console.log(`✅ Successfully fetched ${events.length} events`);
    return res.json(events);
  } catch (error) {
    console.error('❌ Error in events API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/events
router.post('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 POST /api/events - Processing request');

    const newEvent = new Event({
      ...req.body,
      date: new Date(req.body.date)
    });
    await newEvent.save();
    console.log(`✅ Successfully created new event: ${newEvent.title}`);
    return res.json(newEvent);
  } catch (error) {
    console.error('❌ Error in events API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// DELETE /api/events/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log(`📨 DELETE /api/events/${req.params.id} - Processing request`);

    await Event.findByIdAndDelete(req.params.id);
    console.log(`✅ Successfully deleted event with ID: ${req.params.id}`);
    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('❌ Error in events API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 