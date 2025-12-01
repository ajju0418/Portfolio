import React from 'react';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    return (
        <section id="education" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Educational <span className="text-blue-600">Background</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Strong foundation in Computer Science and Business Systems.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-100"></div>

                    {/* Education Item 1 */}
                    <div className="relative z-10 mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-between w-full">
                            <div className="order-1 md:w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                                <div className="mx-auto font-semibold text-lg text-white"></div>
                            </div>
                            <div className="order-1 md:w-5/12 w-full mt-4 md:mt-0 px-4">
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-gray-900">B.Tech Computer Science & Business Systems</h3>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">2021 - 2025</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Sri Krishna College of Engineering and Technology</p>
                                    <p className="text-gray-500 text-sm mt-1">Coimbatore, Tamil Nadu</p>
                                    <div className="mt-4 flex items-center text-blue-600 font-semibold">
                                        CGPA: 7.8
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education Item 2 */}
                    <div className="relative z-10 mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-between w-full">
                            <div className="order-1 md:w-5/12 w-full mb-4 md:mb-0 px-4 md:text-right">
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2 md:flex-row-reverse">
                                        <h3 className="font-bold text-xl text-gray-900">Higher Secondary</h3>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">2019 - 2021</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Vidyaa Vikas Higher Secondary School</p>
                                    <p className="text-gray-500 text-sm mt-1">Coimbatore</p>
                                    <div className="mt-4 flex items-center md:justify-end text-blue-600 font-semibold">
                                        Score: 85.5%
                                    </div>
                                </div>
                            </div>
                            <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                                <div className="mx-auto font-semibold text-lg text-white"></div>
                            </div>
                            <div className="order-1 md:w-5/12"></div>
                        </div>
                    </div>

                    {/* Education Item 3 */}
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between w-full">
                            <div className="order-1 md:w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                                <div className="mx-auto font-semibold text-lg text-white"></div>
                            </div>
                            <div className="order-1 md:w-5/12 w-full mt-4 md:mt-0 px-4">
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-gray-900">Secondary</h3>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">2017 - 2019</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Vidyaa Vikas</p>
                                    <p className="text-gray-500 text-sm mt-1">Coimbatore</p>
                                    <div className="mt-4 flex items-center text-blue-600 font-semibold">
                                        Score: 89.5%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
