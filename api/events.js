import mongoose from 'mongoose';
import { Event } from '../models/schema.js';
import connectDB from '../utils/mongodb.js';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const events = await Event.find({});
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
      }
      break;

    case 'POST':
      try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 