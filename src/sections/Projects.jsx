import React from 'react';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'Ecommerce - Mystore',
            description: 'Developed a full-stack e-commerce application with a responsive UI and backend microservices.',
            tags: ['Angular', 'TypeScript', 'Java Spring Boot', 'MySQL'],
            icon: <Code2 className="w-10 h-10 text-blue-600" />,
            gradient: 'from-blue-500 to-cyan-500',
            features: ['Responsive UI', 'Backend Microservices', 'Full-stack Architecture'],
            githubLink: 'https://github.com/ajju0418/Ecommerce-Project'
        },
        {
            title: 'Reconnect',
            subtitle: 'Supporting Dropout Students',
            description: 'Created an app to offer a supportive community and resources, connecting dropouts with NGOs for career opportunities.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            icon: <Layers className="w-10 h-10 text-purple-600" />,
            gradient: 'from-purple-500 to-pink-500',
            features: ['Community Support', 'NGO Connection', 'Resource Hub'],
            githubLink: '#'
        }
    ];

    return (
        <section id="projects" className="py-20 bg-gray-50/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Featured <span className="text-blue-600">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Showcasing practical applications of my technical skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            {/* Gradient Header */}
                            <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        {project.icon}
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                {project.subtitle && <p className="text-sm text-blue-600 font-semibold mb-3">{project.subtitle}</p>}

                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <ul className="space-y-2">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-500">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
