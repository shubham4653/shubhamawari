import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Database, Globe, Server,
    FileType, Box, Cpu, Terminal, GitBranch,
    Layers, Cpu as Chip, Braces
} from 'lucide-react';

const Skills = () => {
    const skills = [
        { name: 'React', icon: <Code2 size={32} />, category: 'Frontend', color: 'text-cyan-600 dark:text-cyan-400' },
        { name: 'JavaScript', icon: <FileType size={32} />, category: 'Language', color: 'text-yellow-500 dark:text-yellow-400' },
        { name: 'TypeScript', icon: <FileType size={32} />, category: 'Language', color: 'text-blue-600 dark:text-blue-500' },
        { name: 'Node.js', icon: <Server size={32} />, category: 'Backend', color: 'text-green-600 dark:text-green-500' },
        { name: 'Python', icon: <Terminal size={32} />, category: 'Language', color: 'text-blue-500 dark:text-blue-400' },
        { name: 'HTML5', icon: <Globe size={32} />, category: 'Frontend', color: 'text-orange-600 dark:text-orange-500' },
        { name: 'CSS3', icon: <Box size={32} />, category: 'Frontend', color: 'text-blue-600 dark:text-blue-500' },
        { name: 'Tailwind', icon: <Layers size={32} />, category: 'Frontend', color: 'text-cyan-500 dark:text-cyan-300' },
        { name: 'MongoDB', icon: <Database size={32} />, category: 'Database', color: 'text-green-500 dark:text-green-400' },
        { name: 'Java', icon: <Chip size={32} />, category: 'Language', color: 'text-red-600 dark:text-red-500' },
        { name: 'C++', icon: <Braces size={32} />, category: 'Language', color: 'text-blue-700 dark:text-blue-600' },
        { name: 'Git & GitHub', icon: <GitBranch size={32} />, category: 'Tools', color: 'text-orange-500 dark:text-orange-400' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 p-12 bg-blue-500/5 rounded-full blur-3xl -z-10 h-64 w-64" />
            <div className="absolute bottom-0 left-0 p-12 bg-cyan-500/5 rounded-full blur-3xl -z-10 h-64 w-64" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 mb-4">
                        Technical Arsenal
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A curated list of tools, languages, and technologies I use to build scalable and efficient solutions.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-default"
                        >
                            <div className={`p-4 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors ${skill.color}`}>
                                {skill.icon}
                            </div>
                            <div className="text-center">
                                <h3 className="text-slate-800 dark:text-slate-200 font-semibold">{skill.name}</h3>
                                <span className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{skill.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
