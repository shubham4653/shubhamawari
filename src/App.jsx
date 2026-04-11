import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Showcase from './components/Showcase';
import PhysicsBackground from './components/PhysicsBackground';

function App() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Initialization logic moved from Navbar
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <Router>
            <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-200 transition-colors duration-300 relative">
                <PhysicsBackground />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aura-health" element={<Showcase />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
