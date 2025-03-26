import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './mongodb/mongodb';
import { Event } from './mongodb/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const events = await Event.find({});
        res.status(200).json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
      break;

    case 'POST':
      try {
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
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        
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
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        
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
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 