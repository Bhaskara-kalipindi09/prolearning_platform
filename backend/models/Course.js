import mongoose from 'mongoose';

const lessonSchema = mongoose.Schema({
    title: { type: String, required: true },
    contentHtml: { type: String },
    videoUrl: { type: String },
    order: { type: Number },
});

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    lessons: [lessonSchema],
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
