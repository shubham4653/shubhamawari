import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold font-mono text-sm">
                        SA
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-200">
                        Shubham Awari
                    </span>
                </div>

                <div className="flex gap-6 mb-8">
                    <a href="https://github.com/shubham4653" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/shubhamawari/" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:contact@shubhamawari.com" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                <div className="flex items-center text-slate-500 text-sm">
                    <p>Made with <Heart size={14} className="inline text-red-500 mx-1 fill-current" /> by Shubham</p>
                </div>

                <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
                    © {new Date().getFullYear()} All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
