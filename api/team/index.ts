import express, { Request, Response, Router } from 'express';
import { TeamMember } from '../../models/TeamMember';
import dbConnect from '../../lib/mongodb';

const router = Router();

// GET /api/team
router.get('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 GET /api/team - Processing request');

    const members = await TeamMember.find().sort({ role: 1 });
    console.log(`✅ Successfully fetched ${members.length} team members`);
    return res.json(members);
  } catch (error) {
    console.error('❌ Error in team API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/team
router.post('/', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log('📨 POST /api/team - Processing request');

    const newMember = new TeamMember(req.body);
    await newMember.save();
    console.log(`✅ Successfully created new team member: ${newMember.name}`);
    return res.json(newMember);
  } catch (error) {
    console.error('❌ Error in team API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// DELETE /api/team/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    console.log(`📨 DELETE /api/team/${req.params.id} - Processing request`);

    await TeamMember.findByIdAndDelete(req.params.id);
    console.log(`✅ Successfully deleted team member with ID: ${req.params.id}`);
    return res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('❌ Error in team API:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 