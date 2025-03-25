import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  date: Date;
  description: string;
  type: string;
  company?: string;
  location?: string;
}

const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  company: { type: String },
  location: { type: String }
}, {
  timestamps: true
});

// Check if model exists before creating a new one
const News = mongoose.models.News || mongoose.model<INews>('News', newsSchema);

export default News; 