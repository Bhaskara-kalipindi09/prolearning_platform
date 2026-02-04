import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course', error);
                setError('Course not found');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            await axios.post(
                'http://localhost:5000/api/enrollments',
                { courseId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Enrolled successfully!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!course) return <div className="text-center mt-10">Course not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div>
                <img src={course.thumbnail || 'https://via.placeholder.com/600x400'} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-8" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-2xl font-bold text-blue-600">${course.price}</p>
                    <button
                        onClick={handleEnroll}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Enroll Now
                    </button>
                </div>
                <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">{course.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                    {course.lessons && course.lessons.length > 0 ? (
                        <ul className="space-y-4">
                            {course.lessons.map((lesson) => (
                                <li key={lesson._id} className="bg-white p-4 rounded-lg shadow border">
                                    <h3 className="text-xl font-semibold">{lesson.title}</h3>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 italic">No lessons available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
