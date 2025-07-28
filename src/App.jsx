import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download, Sparkles, Send, Code, Database, Wind, GitBranch, Bot, Tv, Palette, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './components/ContactForm.jsx';
import InteractiveLog from './components/InteractiveLog.jsx';

const LeetCodeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><title>LeetCode</title><path d="M13.483 0a1.374 1.374 0 0 0-1.001.434L2.31 10.41a1.373 1.373 0 0 0 0 2.417l10.172 9.975a1.373 1.373 0 0 0 2.001-.001l10.172-9.975a1.373 1.373 0 0 0 0-2.417L14.484.434A1.374 1.374 0 0 0 13.483 0zm-2.44 18.442-7.731-7.58L11.043 3.28l7.73 7.581-7.73 7.581z" fill="currentColor"/></svg>
);

const projects = [
    { id: 'proj1', title: "portfolio.js", description: "A modern portfolio website built with React, showcasing my projects and skills.Integrated with an AI chatbot to enhance user interaction and support.", link: "https://github.com/shubham4653/shubhamawari" },
    { id: 'proj2', title: "carsonly_website.html", description: "A sleek, static car gallery website built with pure HTML and CSS, focusing on clean UI/UX.", link: "https://github.com/shubham4653/CarsOnly-Website" },
    { id: 'proj3', title: "block_shield.js", description: "A blockchain-based, tokenized rate-limiting system that defends servers against bot abuse, spam, and DDoS attacks. Built on Ethereum with integrated AI-enhanced traffic analysis.", link: "https://github.com/shubham4653/vajra" },
    { id: 'proj4', title: "the_quest.js", description: "An interactive web-based game showcasing dynamic JavaScript and user interaction.", link: "https://github.com/shubham4653/thequest" },
];

const skills = [
    { name: 'React', icon: <Code size={48}/> },
    { name: 'JavaScript', icon: <Code size={48}/> },
    { name: 'Python', icon: <Database size={48}/> },
    { name: 'Express', icon: <Code size={48}/> },
    { name: 'HTML5', icon: <Tv size={48}/> },
    { name: 'CSS3', icon: <Palette size={48}/> },
    { name: 'Tailwind CSS', icon: <Wind size={48}/> },
    { name: 'Github', icon: <GitBranch size={48}/> },
    { name: 'MongoDB', icon: <Database size={48}/> },
    { name: 'C++', icon: <PenTool size={48}/> },
    { name: 'JAVA', icon: <PenTool size={48}/> },
    { name: 'AI/ML', icon: <Bot size={48}/> },
    { name: 'Assembly', icon: <Bot size={48}/> },
];
const aboutText = `A driven Computer Science Engineering student at VIT Chennai, I thrive on architecting solutions that are not only functional but also elegant. My core focus is on transforming complex problems into clean, scalable code and creating web experiences that feel both intuitive and powerful.

I believe the best software lies at the intersection of robust back-end logic and a seamless user-centric front-end. I am constantly exploring new technologies to sharpen my skills and am actively seeking opportunities where I can contribute to meaningful projects and grow as a developer.`;


const SkillsCarousel = () => {
    const extendedSkills = [...skills, ...skills];

    return (
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)' }}>
             <div className="absolute inset-y-0 h-full w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
                <motion.div
                    className="flex h-full items-center"
                    animate={{ x: ['-100%', '0%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {extendedSkills.map((skill, index) => (
                        <div key={index} className="flex-shrink-0 w-48 h-48 flex flex-col items-center justify-center p-4 text-center">
                            <div className="text-gray-500 opacity-5">
                                {skill.icon}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};


const InfoPanel = React.memo(({ title, active, onClose, children }) => (
    <AnimatePresence>
        {active && (
            <motion.div
                className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#1e212b] shadow-2xl z-30 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
                <div className="flex items-center justify-between bg-[#282c34] p-3 border-b border-gray-700 flex-shrink-0">
                    <span className="text-gray-300 font-fira">{title}</span>
                    <button onClick={onClose} className="text-gray-400 text-2xl leading-none hover:text-white transition-colors">&times;</button>
                </div>
                 <div className="overflow-y-auto flex-grow p-6 md:p-8 text-gray-300 font-sans">
                    {children}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
));

const HighlightedLineNumbers = React.memo(({ text }) => {
    const highlights = {
        "architecting solutions": "text-blue-400",
        "scalable code": "text-green-400",
        "web experiences": "text-amber-400",
        "back-end logic": "text-purple-400",
        "front-end": "text-purple-400",
        "meaningful projects": "text-green-400",
    };

    const paragraphs = text.split('\n\n');
    let lineCount = 1;

    const renderLine = (line) => {
        const regex = new RegExp(`(${Object.keys(highlights).join('|')})`, 'gi');
        const parts = line.split(regex);
        return parts.map((part, i) => {
            const lowerPart = part.toLowerCase();
            if (highlights[lowerPart]) {
                return <span key={i} className={highlights[lowerPart]}>{part}</span>;
            }
            return part;
        });
    };
    
    return (
        <div className="text-left space-y-4">
            {paragraphs.map((para, pIndex) => (
                 <div key={pIndex}>
                    {para.split('\n').map((line, lIndex) => (
                        <div key={lIndex} className="flex">
                            <span className="text-gray-500 pr-4 select-none w-8 text-right flex-shrink-0">{lineCount++}</span>
                            <span className="text-gray-300">{renderLine(line)}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});


const App = () => {
    const [activePanel, setActivePanel] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navButtonClasses = "font-fira text-gray-400 text-lg relative transition-colors hover:text-white px-2 py-1 rounded-md flex items-center space-x-2";

    const panelContent = {
        'about': {
            title: 'about.md',
            content: <HighlightedLineNumbers text={aboutText} />
        },
        'projects': {
            title: 'projects.json',
            content: (
                 <div className="font-fira text-left">
                    <p className="text-gray-400">{"{"}</p>
                    <div className="pl-4">
                        <p><span className="text-blue-400">"projects"</span>: <span className="text-gray-400">{"["}</span></p>
                        <div className="pl-4 space-y-4">
                           {projects.map((p, i) => (
                               <div key={p.id}>
                                   <p className="text-gray-400">{"{"}</p>
                                   <div className="pl-4">
                                       <p><span className="text-purple-400">"title"</span>: <span className="text-amber-400">"{p.title}"</span>,</p>
                                       <p><span className="text-purple-400">"description"</span>: <span className="text-amber-400">"{p.description}"</span>,</p>
                                       <p><span className="text-purple-400">"source"</span>: <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">"{p.link}"</a></p>
                                   </div>
                                   <p className="text-gray-400">{"}"}{i < projects.length - 1 ? ',' : ''}</p>
                               </div>
                           ))}
                        </div>
                        <p className="text-gray-400">{"]"}</p>
                    </div>
                    <p className="text-gray-400">{"}"}</p>
                </div>
            )
        },
        'skills': {
            title: 'skills.config',
            content: (
                <div className="font-fira text-left relative h-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <span className="text-[20rem] font-bold text-gray-500 opacity-5 select-none">S</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-500"># Core Competencies</p>
                         {skills.map(skill => (
                            <p key={skill.name}><span className="text-blue-400">{skill.name.toLowerCase().replace('.', '')}</span> = <span className="text-green-400">true</span>;</p>
                         ))}
                    </div>
                 </div>
            )
        },
        'contact': {
            title: 'contact.ts',
            content: <ContactForm />
        },
        'status': {
            title: 'status.log',
            content: <InteractiveLog portfolioData={{ about: aboutText, skills, projects }} />
        }
    };

    const togglePanel = (panelId) => {
        setActivePanel(prevPanel => (prevPanel === panelId ? null : panelId));
    };

    useEffect(() => {
        const styleEl = document.createElement('style');
        const fontLink = document.createElement('link');

        fontLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@400;700&display=swap';
        fontLink.rel = 'stylesheet';
        
        styleEl.innerHTML = `
            body { background-color: #16181d; color: #abb2bf; }
            .font-fira { font-family: 'Fira Code', monospace; }
        `;
        
        document.head.appendChild(fontLink);
        document.head.appendChild(styleEl);

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
            document.head.removeChild(fontLink);
            document.head.removeChild(styleEl);
            clearInterval(timer);
        };
    }, []);


    return (
        <main className="min-h-screen h-screen overflow-hidden font-sans relative bg-[#16181d]">
            <SkillsCarousel />
            <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col justify-between">
                <header className="text-center mt-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                        Shubham Awari
                    </h1>
                    <p className="mt-4 text-lg md:text-xl font-mono text-gray-300">
                        <span className="text-blue-400">const</span>{' '}
                        <span className="text-white">role</span> ={' '}
                        <span className="text-amber-400">"CSE Student"</span>
                        <span className="text-white">;</span>
                    </p>
                </header>



                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-700 pointer-events-none">
                    <p className="font-fira text-sm">// Main module</p>
                    <h2 className="text-8xl md:text-9xl font-fira font-bold opacity-10">S</h2>
                </div>

                <nav className="w-full pointer-events-auto max-w-sm">
                   <p className="font-fira text-gray-500 text-sm mb-2">// Explore</p>
                   <div className="flex flex-col items-start space-y-2">
                    <button onClick={() => togglePanel('about')} className={navButtonClasses}><span>{'>>'}</span> <span>about.md</span></button>
                    <button onClick={() => togglePanel('projects')} className={navButtonClasses}><span>{'>>'}</span> <span>projects.json</span></button>
                    <button onClick={() => togglePanel('skills')} className={navButtonClasses}><span>{'>>'}</span> <span>skills.config</span></button>
                    <button onClick={() => togglePanel('contact')} className={navButtonClasses}><span>{'>>'}</span> <span>contact.ts</span></button>
                    <button onClick={() => togglePanel('status')} className={navButtonClasses}><span>{'>>'}</span> <span className="flex items-center">status.log <Sparkles className="ml-2 text-purple-400" size={16}/></span></button>
                    <a href="/resume.pdf" download="ShubhamAwari_Resume.pdf" className={navButtonClasses}><Download size={16} /> <span>resume.pdf</span></a>
                   </div>
                </nav>

                <footer className="w-full flex flex-wrap justify-between items-center gap-4 text-gray-500 font-fira">
                    <div className="hidden sm:block">main*</div>
                    <div className="flex items-center space-x-4 order-last sm:order-none">
                        <a href="https://github.com/shubham4653" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/shubhamawari/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="https://leetcode.com/u/shubhamawari/" target="_blank" rel="noopener noreferrer"
                        className="hover:text-white transition-colors"><LeetCodeIcon /></a>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                        <span>{currentTime.toLocaleDateString()}</span>
                        <span>{currentTime.toLocaleTimeString()}</span>
                    </div>
                </footer>
            </div>
            
            <InfoPanel 
                title={activePanel ? panelContent[activePanel].title : ''} 
                active={!!activePanel} 
                onClose={() => togglePanel(activePanel)}
            >
                {activePanel && panelContent[activePanel].content}
            </InfoPanel>
        </main>
    );
};

export default App;
