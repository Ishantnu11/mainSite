import mongoose from 'mongoose';

export interface ITeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const teamMemberSchema = new mongoose.Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  linkedin: { type: String },
  twitter: { type: String },
  github: { type: String }
});

export const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
export default TeamMember; 