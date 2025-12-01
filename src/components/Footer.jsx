import React from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8">

          {/* Social Icons - Premium & Large */}
          <div className="flex items-center space-x-8">
            <a href="https://github.com/ajju0418" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 rounded-full bg-gray-50 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:-translate-y-1">
                <Github className="w-6 h-6" />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/ajay-b-9974b0237" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 rounded-full bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:-translate-y-1">
                <Linkedin className="w-6 h-6" />
              </div>
            </a>
            <a href="https://leetcode.com/u/ajju17/" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 rounded-full bg-gray-50 text-gray-600 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:-translate-y-1">
                <Code2 className="w-6 h-6" />
              </div>
            </a>
            <a href="mailto:ajaybalu9481@gmail.com" className="group">
              <div className="p-3 rounded-full bg-gray-50 text-gray-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:-translate-y-1">
                <Mail className="w-6 h-6" />
              </div>
            </a>
          </div>

          {/* Signature */}
          <div className="text-center">
            <p className="text-gray-500 font-medium text-sm tracking-wide">
              Designed & Built by <span className="text-gray-900 font-bold">Ajay B</span>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
