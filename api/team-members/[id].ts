import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../lib/mongodb';
import TeamMember from '../../models/TeamMember';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  await dbConnect();

  try {
    if (req.method === 'DELETE') {
      const deletedMember = await TeamMember.findByIdAndDelete(id);
      if (!deletedMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }
      res.status(200).json({ message: 'Team member deleted successfully' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in team member delete API:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
} 