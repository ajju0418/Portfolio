// Single source of truth for the tech stack — consumed by the Hero grid and
// the floating 3D background, so they never drift out of sync.
const base = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const techStack = [
    { name: 'Angular', icon: `${base}/angular/angular-original.svg`, category: 'Frontend' },
    { name: 'React', icon: `${base}/react/react-original.svg`, category: 'Frontend' },
    { name: 'Java', icon: `${base}/java/java-original.svg`, category: 'Backend' },
    { name: 'Spring Boot', icon: `${base}/spring/spring-original.svg`, category: 'Backend' },
    { name: 'MongoDB', icon: `${base}/mongodb/mongodb-original.svg`, category: 'Database' },
    { name: 'Postman', icon: `${base}/postman/postman-original.svg`, category: 'Tools' },
    { name: 'MySQL', icon: `${base}/mysql/mysql-original.svg`, category: 'Database' },
    { name: 'Git', icon: `${base}/git/git-original.svg`, category: 'Tools' },
    { name: 'Docker', icon: `${base}/docker/docker-original.svg`, category: 'DevOps' },
    { name: 'AWS', icon: `${base}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, category: 'Cloud' },
];

export default techStack;
