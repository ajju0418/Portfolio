import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Code2, Database, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/LINKED N.png';
import cognizantLogo from '../assets/cognizant.jpeg';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen pt-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side - Profile Picture with Work Info */}
                    <div className="flex flex-col items-center lg:items-end space-y-6 lg:pr-8">
                        <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                            <img 
                                src={profileImage} 
                                alt="Ajay - Software Engineer" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Work Info Card */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 w-80">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                                    <img 
                                        src={cognizantLogo} 
                                        alt="Cognizant" 
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Software Engineer</h3>
                                    <p className="text-gray-600 text-sm">Cognizant Technology Solutions</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span className="text-xs text-green-600 font-medium">Currently</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6">

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ajay</span>
                            <br />
                            <span className="text-3xl md:text-4xl text-gray-600">Full Stack Developer</span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Building scalable enterprise solutions at Cognizant. Specialized in
                            <span className="font-semibold text-gray-900"> Angular</span>,
                            <span className="font-semibold text-gray-900"> Java</span>, and
                            <span className="font-semibold text-gray-900"> Spring Boot</span>.
                            Passionate about clean code, performance optimization, and modern web architecture.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/projects" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all duration-300 shadow-sm">
                                Let's Connect
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
                                <span className="text-sm">📍</span>
                                <span className="font-medium text-gray-700 text-sm">Chennai, India</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="font-medium text-green-700 text-sm">Open to opportunities</span>
                            </div>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100 shadow-sm">
                                <div className="text-2xl font-bold text-blue-600">Fresher</div>
                                <div className="text-xs text-gray-600">Experience</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100 shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">10+</div>
                                <div className="text-xs text-gray-600">Technologies</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100 shadow-sm">
                                <div className="text-2xl font-bold text-green-600">5+</div>
                                <div className="text-xs text-gray-600">Projects</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Section */}
                <div className="mt-20 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tech Stack</h2>
                        <p className="text-lg text-gray-600">Technologies I work with</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', category: 'Frontend' },
                            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Frontend' },
                            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', category: 'Backend' },
                            { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', category: 'Backend' },
                            { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'Language' },
                            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'Backend' },
                            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'Database' },
                            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'Tools' },
                            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'DevOps' },
                            { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', category: 'Cloud' }
                        ].map((tech) => (
                            <div key={tech.name} className="group">
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                                    <div className="flex flex-col items-center text-center">
                                        <img 
                                            src={tech.icon} 
                                            alt={tech.name} 
                                            className="w-12 h-12 mb-3" 
                                        />
                                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{tech.name}</h3>
                                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded-full">{tech.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-16 mb-20">
                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="font-medium text-gray-700">10+ Technologies • Full Stack Ready</span>
                        </div>
                    </div>
                </div>

                {/* Technical Expertise Section */}
                <div className="mt-16 mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Technical <span className="text-blue-600">Expertise</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive skill set covering full-stack development and enterprise technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Frontend Development',
                                icon: <Code2 className="w-8 h-8 text-white" />,
                                color: 'bg-pink-500',
                                description: 'Building responsive, performant user interfaces with modern frameworks.',
                                skills: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'TypeScript']
                            },
                            {
                                title: 'Backend Development',
                                icon: <Database className="w-8 h-8 text-white" />,
                                color: 'bg-blue-500',
                                description: 'Developing robust server-side applications and microservices.',
                                skills: ['Java', 'Spring', 'Spring Boot', 'MySQL', 'REST APIs']
                            },
                            {
                                title: 'Tools & Problem Solving',
                                icon: <Terminal className="w-8 h-8 text-white" />,
                                color: 'bg-green-500',
                                description: 'Development tools and algorithmic problem solving.',
                                skills: ['Git', 'VS Code', 'Postman', 'LeetCode', 'Data Structures', 'Algorithms']
                            }
                        ].map((category, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col">
                                <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-sm`}>
                                    {React.cloneElement(category.icon, { className: 'w-10 h-10 text-white' })}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                                <p className="text-gray-600 mb-6 text-base">{category.description}</p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
