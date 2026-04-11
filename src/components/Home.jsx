import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Footer from './Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <Footer />
        </>
    );
};

export default Home;
