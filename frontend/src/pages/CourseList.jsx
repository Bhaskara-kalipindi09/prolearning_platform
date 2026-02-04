import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/courses');
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {courses.map((course) => (
                    <div key={course._id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-48">
                            <img
                                src={course.thumbnail || 'https://via.placeholder.com/300x200'}
                                alt={course.title}
                                className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                            />
                        </div>
                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                            <h3 className="text-lg font-medium text-gray-900">
                                <Link to={`/courses/${course._id}`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {course.title}
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500">{course.description ? course.description.substring(0, 100) + '...' : ''}</p>
                            <div className="flex-1 flex flex-col justify-end">
                                <p className="text-base font-medium text-gray-900">${course.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
