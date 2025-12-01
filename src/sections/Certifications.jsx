import React from 'react';
import { Award, Trophy, BookOpen } from 'lucide-react';

const Certifications = () => {
    const certifications = [
        'Programming in Java - NPTEL',
        'Introduction to Cybersecurity - CISCO',
        'Java language features - INFOSYS SPRINGBOARD',
        'Introduction to networks - CISCO',
        'Technical English for Engineers'
    ];

    const participations = [
        { title: "Paper Presented - YUGAM'23", icon: <BookOpen className="w-5 h-5 text-purple-600" /> },
        { title: "QUIZ COMPETITION - DHRUVA'23", icon: <Trophy className="w-5 h-5 text-yellow-600" /> },
        { title: "Workshops - TECHNOVISTA'23", icon: <Award className="w-5 h-5 text-blue-600" /> },
        { title: "Ideathon - SKCET", icon: <Award className="w-5 h-5 text-green-600" /> }
    ];

    return (
        <section id="certifications" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Certifications & <span className="text-blue-600">Achievements</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Continuous learning and active participation in technical events.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Certifications Column */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                        </div>

                        <div className="space-y-4">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-medium">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Participations Column */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                                <Trophy className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Participations</h3>
                        </div>

                        <div className="space-y-4">
                            {participations.map((item, index) => (
                                <div key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors duration-200">
                                    <div className="mr-4 p-2 bg-white rounded-full shadow-sm">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-700 font-medium">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Certifications;
