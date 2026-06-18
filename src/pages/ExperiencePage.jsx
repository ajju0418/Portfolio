import React from 'react';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Certifications from '../sections/Certifications';
import PageWrapper from '../components/PageWrapper';

const ExperiencePage = () => (
    <PageWrapper className="pt-16">
        <Experience />
        <Education />
        <Certifications />
    </PageWrapper>
);

export default ExperiencePage;
