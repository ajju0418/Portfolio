// Single source of truth for all portfolio content. Consumed by both the DOM
// overlay cards and the 3D scenes, so the two layers can never drift apart.

const devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const profile = {
    name: 'Ajay',
    fullName: 'Ajay B',
    initials: 'AB',
    title: 'Full Stack Developer',
    location: 'Chennai, India',
    roles: [
        'Software Engineer',
        'Backend Developer',
        'Full Stack Developer',
        'Java & Spring Boot Dev',
        'API Architect',
        'Problem Solver',
    ],
    blurb:
        'Building secure, enterprise-grade solutions at Cognizant. Focused on clean code, performance, and modern architecture across Java, Spring Boot, and Angular.',
    resume: '/Ajay_B_Resume.pdf',
};

// Each orb in the Home "solar system". `tint` drives its emissive glow.
export const techStack = [
    { name: 'Angular', icon: `${devicon}/angular/angular-original.svg`, category: 'Frontend', tint: '#dd0031' },
    { name: 'React', icon: `${devicon}/react/react-original.svg`, category: 'Frontend', tint: '#00f0ff' },
    { name: 'Java', icon: `${devicon}/java/java-original.svg`, category: 'Backend', tint: '#f89820' },
    { name: 'Spring Boot', icon: `${devicon}/spring/spring-original.svg`, category: 'Backend', tint: '#6db33f' },
    { name: 'MongoDB', icon: `${devicon}/mongodb/mongodb-original.svg`, category: 'Database', tint: '#47a248' },
    { name: 'MySQL', icon: `${devicon}/mysql/mysql-original.svg`, category: 'Database', tint: '#00758f' },
    { name: 'Docker', icon: `${devicon}/docker/docker-original.svg`, category: 'DevOps', tint: '#2496ed' },
    { name: 'AWS', icon: `${devicon}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, category: 'Cloud', tint: '#ff9900' },
    { name: 'Git', icon: `${devicon}/git/git-original.svg`, category: 'Tools', tint: '#f05032' },
    { name: 'Postman', icon: `${devicon}/postman/postman-original.svg`, category: 'Tools', tint: '#ff6c37' },
];

export const techCategories = ['All', ...Array.from(new Set(techStack.map((t) => t.category)))];

// Milestones for the Journey timeline — ordered most-recent-first (top of band).
export const experience = [
    {
        title: 'Programmer Analyst Trainee',
        company: 'Cognizant Technology Solutions',
        period: 'Oct 2025 — Present',
        kind: 'work',
        current: true,
        description:
            'Working on the Elsevier research publishing platform with a focus on authentication and authorization. Contributing to secure backend development, testing, and code reviews in an Agile environment.',
        skills: ['Java', 'Spring Boot', 'Agile', 'Backend', 'Security'],
    },
    {
        title: 'Java Full Stack Intern',
        company: 'Cognizant Technology Solutions',
        period: 'Jul 2025 — Sep 2025',
        kind: 'work',
        current: false,
        description:
            'Built a Library Management System using Java and Spring Boot microservices. Implemented Spring Security with a React frontend and designed RESTful APIs for book management.',
        skills: ['Java', 'Spring Boot', 'React', 'Microservices', 'Docker'],
    },
];

export const education = [
    {
        title: 'B.Tech, CSBS',
        company: 'Sri Krishna College of Engineering & Technology',
        period: 'Nov 2021 — Apr 2025',
        kind: 'edu',
        description: 'Computer Science and Business Systems — Coimbatore, Tamil Nadu.',
        skills: ['Data Structures', 'Algorithms', 'DBMS', 'OOP'],
    },
    {
        title: 'Higher Secondary',
        company: 'Vidyaa Vikas Matric Hr. Sec. School',
        period: 'Jun 2019 — May 2020',
        kind: 'edu',
        description: 'Higher Secondary education — Coimbatore.',
        skills: [],
    },
    {
        title: 'Secondary',
        company: 'Vidyaa Vikas',
        period: '2017 — 2019',
        kind: 'edu',
        description: 'Scored 89.5% in the secondary examination.',
        skills: ['Score: 89.5%'],
    },
];

// Top → bottom down the Journey band: recent work first, then schooling.
export const timeline = [...experience, ...education];

export const projects = [
    {
        title: 'NEXURA',
        subtitle: 'Full-Stack TypeScript Application',
        description:
            'A modern full-stack application built with TypeScript, featuring a robust backend architecture and responsive frontend.',
        tags: ['TypeScript', 'Full-Stack', 'REST API'],
        accent: '#ec4899',
        link: 'https://github.com/ajju0418/NEXURA',
    },
    {
        title: 'E-commerce MyStore',
        subtitle: 'Microservices Platform',
        description:
            'A complete e-commerce app with a Spring Boot microservices backend and Angular frontend — API gateway, service discovery, and 8 services.',
        tags: ['Spring Boot', 'Angular', 'Microservices', 'JWT'],
        accent: '#10b981',
        link: 'https://github.com/ajju0418/Ecommerce_Mystore',
    },
    {
        title: 'Library Management',
        subtitle: 'Secure RBAC Platform',
        description:
            'A full-stack system with secure authentication, role-based access control, book/member management, and fine calculation.',
        tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'],
        accent: '#8b5cf6',
        link: 'https://github.com/ajju0418',
    },
    {
        title: 'Banking System',
        subtitle: 'Core Banking Operations',
        description:
            'A Java-based system handling account creation, deposits, withdrawals, and transaction history with strong data validation.',
        tags: ['Core Java', 'SQL', 'JDBC'],
        accent: '#22d3ee',
        link: 'https://github.com/ajju0418',
    },
];

export const contact = {
    accessKey: 'b2b0f142-f625-4b41-b1ac-37aa9eaafdc0',
    details: [
        { label: 'Phone', value: '+91 99944 44669', href: 'tel:+919994444669' },
        { label: 'Email', value: 'ajaybalu9481@gmail.com', href: 'mailto:ajaybalu9481@gmail.com' },
        { label: 'Location', value: 'Chennai, India', href: null },
    ],
    socials: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajay-b-9974b0237' },
        { label: 'GitHub', href: 'https://github.com/ajju0418' },
        { label: 'LeetCode', href: 'https://leetcode.com/u/ajju17/' },
    ],
};

// Section metadata — drives the dot-nav, overlay anchors, and 3D theming order.
export const sections = [
    { id: 'home', label: 'Home', accent: '#00f0ff' },
    { id: 'journey', label: 'Journey', accent: '#f59e0b' },
    { id: 'work', label: 'Projects', accent: '#ec4899' },
    { id: 'contact', label: 'Contact', accent: '#f97316' },
];

export default profile;
