import mongoose from 'mongoose';

const enrollmentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    progress: {
        type: Map,
        of: Boolean,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
