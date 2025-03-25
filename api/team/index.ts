import { Request, Response } from 'express';
import { TeamMember } from '../../models/TeamMember';
import dbConnect from '../../lib/mongodb';

export default async function handler(req: Request, res: Response) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await dbConnect();
    console.log(`📨 ${req.method} /api/team - Processing request`);

    switch (req.method) {
      case 'GET':
        const members = await TeamMember.find().sort({ role: 1 });
        console.log(`✅ Successfully fetched ${members.length} team members`);
        return res.json(members);

      case 'POST':
        const newMember = new TeamMember(req.body);
        await newMember.save();
        console.log(`✅ Successfully created new team member: ${newMember.name}`);
        return res.json(newMember);

      case 'DELETE':
        const { id } = req.params;
        await TeamMember.findByIdAndDelete(id);
        console.log(`✅ Successfully deleted team member with ID: ${id}`);
        return res.json({ message: 'Team member deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Error in team API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 