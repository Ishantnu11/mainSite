import dbConnect from '../../lib/mongodb';
import TeamMember from '../../models/TeamMember';
export default async function handler(req, res) {
    await dbConnect();
    try {
        switch (req.method) {
            case 'GET':
                const teamMembers = await TeamMember.find();
                res.status(200).json(teamMembers);
                break;
            case 'POST':
                const { name, role, image, linkedin, twitter, github } = req.body;
                const newTeamMember = new TeamMember({
                    name,
                    role,
                    image,
                    linkedin,
                    twitter,
                    github
                });
                await newTeamMember.save();
                res.status(201).json(newTeamMember);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
    catch (error) {
        console.error('Error in team members API:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}
