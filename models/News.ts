import mongoose from 'mongoose';

export interface INews {
  title: string;
  description: string;
  type: 'news' | 'internship';
  company?: string;
  location?: string;
  date: Date;
}

const newsSchema = new mongoose.Schema<INews>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['news', 'internship'],
    required: true
  },
  company: { type: String },
  location: { type: String },
  date: { type: Date, required: true }
});

export const News = mongoose.models.News || mongoose.model<INews>('News', newsSchema);
export default News; 