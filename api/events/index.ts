import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Define Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: String,
  status: { 
    type: String, 
    required: true,
    enum: ['upcoming', 'ongoing', 'past'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

// Create Event Model (only if it doesn't exist)
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

// GET all events
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/events - Fetching all events...');
    const events = await Event.find().sort({ date: -1 });
    console.log(`✅ Successfully fetched ${events.length} events`);
    console.log('Events:', events);
    res.json(events);
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST new event
router.post('/', async (req, res) => {
  try {
    console.log('📝 POST /api/events - Creating new event:', req.body);
    
    // Ensure date is properly formatted
    const eventData = {
      ...req.body,
      date: new Date(req.body.date)
    };
    
    const event = new Event(eventData);
    await event.save();
    
    console.log('✅ Event created successfully:', event);
    res.status(201).json(event);
  } catch (error) {
    console.error('❌ Error creating event:', error);
    res.status(400).json({ 
      error: 'Failed to create event',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ DELETE /api/events/:id - Deleting event:', req.params.id);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      console.log('❌ Event not found');
      return res.status(404).json({ error: 'Event not found' });
    }
    console.log('✅ Event deleted successfully');
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router; 