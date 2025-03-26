import mongoose from 'mongoose';
const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String }
});
export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
