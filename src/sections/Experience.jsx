import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Professional <span className="text-blue-600">Experience</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Building enterprise-grade solutions and delivering value to clients.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-blue-300 rounded-full opacity-20"></div>

                    {/* Experience Item */}
                    <div className="relative z-10 mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-between w-full">

                            {/* Date (Left on Desktop) */}
                            <div className="order-1 md:w-5/12 text-left md:text-right mb-4 md:mb-0">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm shadow-sm border border-blue-100">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    July 2025 - Present
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="order-1 md:w-2/12 flex justify-center relative my-4 md:my-0">
                                <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20">
                                    <Briefcase className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Content Card (Right on Desktop) */}
                            <div className="order-1 md:w-5/12 w-full">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">Software Engineer Trainee</h3>
                                    <p className="text-base font-semibold text-gray-600 mb-4">Cognizant Technology Solutions</p>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        Working on enterprise-level applications serving thousands of users globally.
                                        Collaborating with cross-functional teams to design, develop, and maintain
                                        scalable software solutions using modern technologies and best practices.
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {['Angular', 'Java', 'Spring Boot', 'Enterprise Architecture', 'Agile/Scrum', 'REST APIs'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                                                {skill}
                                            </span>
                                        ))}
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

export default Experience;
