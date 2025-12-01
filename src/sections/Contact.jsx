import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Code2 } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white/80 backdrop-blur-sm relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 skew-x-12 transform origin-top translate-x-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Get in <span className="text-blue-600">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Open to new opportunities and collaborations. Feel free to reach out!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 relative overflow-hidden group h-full">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 transition-transform duration-500 group-hover:scale-110"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-full -ml-20 -mb-20 transition-transform duration-500 group-hover:scale-110"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
                            <p className="text-gray-600 mb-12 leading-relaxed text-lg">
                                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center space-x-6 group/item">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-lg font-bold text-gray-900">+91 99944 44669</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 group/item">
                                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:ajaybalu9481@gmail.com" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                            ajaybalu9481@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 group/item">
                                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Location</p>
                                        <p className="text-lg font-bold text-gray-900">Chennai, India</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <a href="https://www.linkedin.com/in/ajay-b-9974b0237" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-50 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl transition-all duration-300 font-medium text-gray-700">
                                        <Linkedin className="w-5 h-5" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://leetcode.com/u/ajju17/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-50 hover:bg-yellow-600 hover:text-white px-5 py-3 rounded-xl transition-all duration-300 font-medium text-gray-700">
                                        <Code2 className="w-5 h-5" />
                                        <span>LeetCode</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
                        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                            <input type="hidden" name="access_key" value="b2b0f142-f625-4b41-b1ac-37aa9eaafdc0" />
                            <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />
                            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                                    <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="john@example.com" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input type="text" id="subject" name="subject" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Project Inquiry" required />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea id="message" name="message" rows="4" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Tell me about your project..." required></textarea>
                            </div>

                            <button type="submit" className="w-full inline-flex items-center justify-center px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 group">
                                Send Message
                                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
