import React from 'react';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Certifications from '../sections/Certifications';

const ExperiencePage = () => {
    return (
        <div className="pt-16">
            <Experience />
            <Education />
            <Certifications />
        </div>
    );
};

export default ExperiencePage;
