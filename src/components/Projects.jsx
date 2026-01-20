import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import thumbPortfolio from '../assets/project_portfolio.png';
import thumbCars from '../assets/project_cars.png';
import thumbSecurity from '../assets/project_security.png';
import thumbGame from '../assets/project_game.png';

const projects = [
    {
        id: 'proj1',
        title: "Portfolio Website",
        description: "A modern portfolio website built with React, showcasing my projects and skills. Integrated with an AI chatbot to enhance user interaction and support.",
        link: "https://github.com/shubham4653/shubhamawari",
        tags: ["React", "AI Integration", "Tailwind"],
        image: thumbPortfolio
    },
    {
        id: 'proj2',
        title: "CarsOnly Gallery",
        description: "A sleek, static car gallery website built with pure HTML and CSS, focusing on clean UI/UX and responsive design principles.",
        link: "https://github.com/shubham4653/CarsOnly-Website",
        tags: ["HTML5", "CSS3", "Design"],
        image: thumbCars
    },
    {
        id: 'proj3',
        title: "Block Shield",
        description: "A blockchain-based, tokenized rate-limiting system that defends servers against bot abuse, spam, and DDoS attacks. Built on Ethereum with integrated AI-enhanced traffic analysis.",
        link: "https://github.com/shubham4653/vajra",
        tags: ["Blockchain", "Ethereum", "AI Security"],
        image: thumbSecurity
    },
    {
        id: 'proj4',
        title: "The Quest",
        description: "An interactive web-based game showcasing dynamic JavaScript logic, state management, and engaging user interaction patterns.",
        link: "https://github.com/shubham4653/thequest",
        tags: ["JavaScript", "Game Dev", "Interactive"],
        image: thumbGame
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center">
                        Featured Projects
                    </h2>
                    <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-300 flex flex-col shadow-lg"
                        >

                            <div className="h-56 bg-slate-200 dark:bg-slate-800 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 flex flex-col flex-1 relative">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"
                                            title="View Information"
                                        >
                                            <Github size={20} />
                                        </a>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"
                                            title="Live Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/20 rounded-full border border-cyan-200 dark:border-cyan-900/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://github.com/shubham4653?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
                    >
                        View all repositories <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
