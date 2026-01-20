import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import PhysicsBackground from './components/PhysicsBackground';
import Footer from './components/Footer';

function App() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-200 transition-colors duration-300 relative">
            <PhysicsBackground />
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <Footer />
        </div>
    );
}

export default App;
