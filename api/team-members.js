import mongoose from 'mongoose';
import { TeamMember } from '../models/schema.js';
import connectDB from '../utils/mongodb.js';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const teamMembers = await TeamMember.find({});
        res.status(200).json(teamMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
      }
      break;

    case 'POST':
      try {
        const teamMember = await TeamMember.create(req.body);
        res.status(201).json(teamMember);
      } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ error: 'Failed to create team member' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await TeamMember.findByIdAndDelete(id);
        res.status(200).json({ message: 'Team member deleted successfully' });
      } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ error: 'Failed to delete team member' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 