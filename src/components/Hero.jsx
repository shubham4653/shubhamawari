import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-purple-500/10 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <motion.div
                        className="flex-1 text-center md:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block mb-4 px-3 py-1 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-sm"
                        >
                            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">Hello, World! I'm</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                            Shubham <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">Awari</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            A passionate <span className="text-slate-900 dark:text-slate-200 font-medium">Computer Science Student</span> & <span className="text-slate-900 dark:text-slate-200 font-medium">Full Stack Developer</span> turning complex problems into elegant, scalable solutions.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                            <a href="#projects" className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
                                View My Work
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#contact" className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm">
                                Contact Me
                            </a>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-6">
                            <SocialLink href="https://github.com/shubham4653" icon={<Github size={20} />} />
                            <SocialLink href="https://www.linkedin.com/in/shubhamawari/" icon={<Linkedin size={20} />} />
                            <SocialLink href="mailto:contact@shubhamawari.com" icon={<Mail size={20} />} />
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full max-w-md md:max-w-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
                            {/* Abstract simplified interactive terminal illustration or simple graphic */}
                            <div className="relative w-full max-w-[400px] h-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-2xl overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 group">
                                <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-400 transition-colors" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors" />
                                    <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors" />
                                    <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-mono">Developer.jsx</span>
                                </div>
                                <div className="space-y-3 font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <div className="flex"><span className="text-purple-600 dark:text-purple-400 mr-2">const</span> <span className="text-blue-600 dark:text-blue-400 mr-2">Shubham</span> = <span className="text-slate-900 dark:text-white">{"{"}</span></div>
                                    <div className="pl-4">role: <span className="text-green-600 dark:text-green-400">'Full Stack Engineer'</span>,</div>
                                    <div className="pl-4">education: <span className="text-green-600 dark:text-green-400">'VIT Chennai'</span>,</div>
                                    <div className="pl-4">
                                        skills: <span className="text-amber-600 dark:text-yellow-400">['React', 'MERN', 'Next.js']</span>,
                                    </div>
                                    <div className="pl-4">
                                        passion: <span className="text-green-600 dark:text-green-400">'Building scalable systems'</span>,
                                    </div>
                                    <div className="pl-4 flex items-start">
                                        <span className="mr-2">code:</span>
                                        <span className="text-cyan-600 dark:text-cyan-400">() =&gt; </span>
                                        <span className="text-orange-500 dark:text-orange-400">{"{"}</span>
                                    </div>
                                    <div className="pl-8 text-slate-500 dark:text-slate-300">
                                        <span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-green-600 dark:text-green-400">"Innovation"</span>;
                                    </div>
                                    <div className="pl-4 text-orange-500 dark:text-orange-400">{"}"}</div>
                                    <div><span className="text-slate-900 dark:text-white">{"}"}</span>;</div>
                                    <br />
                                    <div className="typing-cursor text-slate-400 dark:text-slate-500">
                             // Loading future...
                                        <span className="w-2 h-4 bg-cyan-500 inline-block align-middle ml-1 animate-pulse" />
                                    </div>
                                </div>

                                {/* Decorative glowing orb behind */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-lg hover:text-white hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 shadow-sm border border-slate-200 dark:border-transparent"
    >
        {icon}
    </a>
)

export default Hero;
