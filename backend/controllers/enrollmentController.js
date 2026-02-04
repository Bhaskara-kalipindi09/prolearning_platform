import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        const enrollment = await Enrollment.create({
            userId,
            courseId,
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's enrolled courses
// @route   GET /api/enrollments/my-courses
// @access  Private
export const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user._id }).populate('courseId');

        // Return just the course details
        const courses = enrollments.map(enrollment => enrollment.courseId);

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
