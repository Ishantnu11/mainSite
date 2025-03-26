import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'past'],
        default: 'upcoming'
    }
});
export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
