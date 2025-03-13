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