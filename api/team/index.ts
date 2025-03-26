import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Define Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  linkedin: String,
  twitter: String,
  github: String
}, {
  timestamps: true
});

// Create Team Member Model (only if it doesn't exist)
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

// GET all team members
router.get('/', async (req, res) => {
  try {
    console.log('📥 Fetching all team members...');
    const members = await TeamMember.find().sort({ role: 1, name: 1 });
    console.log(`✅ Successfully fetched ${members.length} team members`);
    res.json(members);
  } catch (error) {
    console.error('❌ Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// POST new team member
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new team member:', req.body);
    const member = new TeamMember(req.body);
    await member.save();
    console.log('✅ Team member created successfully:', member._id);
    res.status(201).json(member);
  } catch (error) {
    console.error('❌ Error creating team member:', error);
    res.status(400).json({ error: 'Failed to create team member' });
  }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting team member:', req.params.id);
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      console.log('❌ Team member not found');
      return res.status(404).json({ error: 'Team member not found' });
    }
    console.log('✅ Team member deleted successfully');
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router; 