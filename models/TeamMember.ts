import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  image: string;
  isLead?: boolean;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const teamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  isLead: { type: Boolean, default: false },
  linkedin: { type: String },
  twitter: { type: String },
  github: { type: String }
}, {
  timestamps: true
});

// Check if model exists before creating a new one
const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);

export default TeamMember; 