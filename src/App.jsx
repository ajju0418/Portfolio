import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const basename = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';

    return (
        <Router basename={basename}>
            <ScrollProgress />
            <div className="min-h-screen bg-ink-900 text-slate-300 flex flex-col relative overflow-x-hidden">
                {/* Ambient background layers */}
                <div className="pointer-events-none fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[140px] animate-float-slow" />
                    <div className="absolute top-[40%] left-[-15%] h-[30rem] w-[30rem] rounded-full bg-accent-glow/15 blur-[150px] animate-float-slow [animation-delay:3s]" />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
