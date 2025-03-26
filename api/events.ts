import { Router, Request, Response } from 'express';
import { connectToDatabase } from '../lib/mongodb';
import { Event } from './mongodb/models';

const router = Router();

// GET /api/events - Get all events
router.get('/', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /api/events - Create a new event
router.post('/', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    // Ensure status is set, default to 'upcoming' if not provided
    const eventData = {
      ...req.body,
      status: req.body.status || 'upcoming'
    };
    
    console.log('Creating event with data:', eventData);
    const event = await Event.create(eventData);
    console.log('Event created successfully:', event);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id - Update an event
router.put('/:id', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    
    // Ensure date is properly formatted
    const eventData = {
      ...req.body,
      status: req.body.status || 'upcoming'
    };
    
    console.log(`Updating event ${id} with data:`, eventData);
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      eventData,
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    console.log('Event updated successfully:', updatedEvent);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router; 