import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch enrolled courses', error);
            } finally {
                setLoading(false);
            }
        };

        if (userRole !== 'admin') {
            fetchEnrolledCourses();
        } else {
            setLoading(false);
        }
    }, [userRole]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

            {userRole === 'admin' ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
                    <p className="text-gray-600 mb-4">Welcome, Admin! manage your platform.</p>
                    <Link to="/create-course" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        Create New Course
                    </Link>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-6">My Enrolled Courses</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : courses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                            {courses.map((course) => (
                                <div key={course._id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
                                    <div className="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-48">
                                        <img
                                            src={course.thumbnail || 'https://via.placeholder.com/300'}
                                            alt={course.title}
                                            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                                        />
                                    </div>
                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                <Link to={`/courses/${course._id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {course.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-3 text-base text-gray-500 line-clamp-2">{course.description ? course.description.substring(0, 100) + '...' : ''}</p>
                                        </div>
                                        <div className="mt-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Enrolled
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                            <Link to="/courses" className="text-blue-600 hover:text-blue-500 font-medium">
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
