import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../lib/mongodb';
import Event from '../../models/Event';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  await dbConnect();

  try {
    if (req.method === 'DELETE') {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in event delete API:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
} 