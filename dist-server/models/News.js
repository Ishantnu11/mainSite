import mongoose from 'mongoose';
const newsSchema = new mongoose.Schema({
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
export const News = mongoose.models.News || mongoose.model('News', newsSchema);
export default News;
