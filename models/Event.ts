import mongoose from 'mongoose';

export interface IEvent {
  title: string;
  date: Date;
  description: string;
  image: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const eventSchema = new mongoose.Schema<IEvent>({
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

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
export default Event; 