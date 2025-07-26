import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download, Sparkles, Send, Code, Database, Wind, GitBranch, Bot, Tv, Palette, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// --- Helper Components & Data ---

const LeetCodeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><title>LeetCode</title><path d="M13.483 0a1.374 1.374 0 0 0-1.001.434L2.31 10.41a1.373 1.373 0 0 0 0 2.417l10.172 9.975a1.373 1.373 0 0 0 2.001-.001l10.172-9.975a1.373 1.373 0 0 0 0-2.417L14.484.434A1.374 1.374 0 0 0 13.483 0zm-2.44 18.442-7.731-7.58L11.043 3.28l7.73 7.581-7.73 7.581z" fill="currentColor"/></svg>
);

const projects = [
    { id: 'proj1', title: "face_gender_age.js", description: "Real-time face, gender, and age detection using webcam input and modern JavaScript.", link: "https://github.com/shubham4653/facegenderage" },
    { id: 'proj2', title: "carsonly_website.html", description: "A sleek, static car gallery website built with pure HTML and CSS, focusing on clean UI/UX.", link: "https://github.com/shubham4653/CarsOnly-Website" },
    { id: 'proj3', title: "the_quest.js", description: "An interactive web-based game showcasing dynamic JavaScript and user interaction.", link: "https://github.com/shubham4653/thequest" },
];

const skills = [
    { name: 'React', icon: <Code size={48}/> },
    { name: 'JavaScript', icon: <Code size={48}/> },
    { name: 'Python', icon: <Database size={48}/> },
    { name: 'Node.js', icon: <Code size={48}/> },
    { name: 'HTML5', icon: <Tv size={48}/> },
    { name: 'CSS3', icon: <Palette size={48}/> },
    { name: 'Tailwind CSS', icon: <Wind size={48}/> },
    { name: 'Git', icon: <GitBranch size={48}/> },
    { name: 'MongoDB', icon: <Database size={48}/> },
    { name: 'C++', icon: <PenTool size={48}/> },
    { name: 'AI/ML', icon: <Bot size={48}/> },
];
const aboutText = `A driven Computer Science Engineering student at VIT Chennai, I thrive on architecting solutions that are not only functional but also elegant. My core focus is on transforming complex problems into clean, scalable code and creating web experiences that feel both intuitive and powerful.

I believe the best software lies at the intersection of robust back-end logic and a seamless user-centric front-end. I am constantly exploring new technologies to sharpen my skills and am actively seeking opportunities where I can contribute to meaningful projects and grow as a developer.`;


// --- New Background Component ---
const SkillsCarousel = () => {
    // Duplicate skills for a seamless loop
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


// --- Main UI & App Components ---

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

// --- Gemini-Powered Components ---

const ContactForm = () => {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateMessage = async () => {
        if (!keywords) {
            setStatus({ text: 'Please enter some keywords to generate a message.', type: 'error' });
            return;
        }
        setIsGenerating(true);
        setStatus({ text: 'Generating message...', type: 'info' });

        const prompt = `Write a short, professional but friendly message to a CSE student named Shubham, based on these keywords: "${keywords}". The message should be suitable for a recruiter or professional reaching out for the first time.`;
        
        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This will be handled by the environment, no need for process.env
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates[0].content.parts[0].text) {
                setMessage(result.candidates[0].content.parts[0].text);
                setStatus(null);
            } else {
                throw new Error("Failed to generate message.");
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setStatus({ text: "AI generation failed. Please try again.", type: "error" });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        data.set('message', message);
        
        setStatus({ text: 'Sending...', type: 'info' });

        try {
            data.append("access_key", "00f92614-e01c-4596-b25a-f78c5b7a7b1e");
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (result.success) {
                setStatus({ text: 'Message sent successfully!', type: 'success' });
                form.reset();
                setMessage('');
                setKeywords('');
            } else {
                setStatus({ text: result.message, type: 'error' });
            }
        } catch (error) {
            setStatus({ text: 'An error occurred.', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="font-fira text-left">
             <p><span className="text-purple-400">async function</span> <span className="text-blue-400">sendMessage</span>(<span className="text-amber-400">data</span>) {"{"}</p>
            <div className="pl-4 space-y-4 my-2">
                <div>
                    <label className="text-gray-400 block mb-1" htmlFor="name">// name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-[#282c34] p-2 rounded-sm border border-gray-600 focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="text-gray-400 block mb-1" htmlFor="email">// email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-[#282c34] p-2 rounded-sm border border-gray-600 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="text-gray-400 block mb-1" htmlFor="keywords">// AI message generator (optional keywords)</label>
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            id="keywords" 
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="e.g., internship, impressed by projects" 
                            className="w-full bg-[#282c34] p-2 rounded-sm border border-gray-600 focus:outline-none focus:border-blue-400" 
                        />
                        <button type="button" onClick={handleGenerateMessage} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700 px-3 rounded-sm transition-colors flex items-center disabled:bg-purple-900 disabled:cursor-wait">
                           <Sparkles size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="text-gray-400 block mb-1" htmlFor="message">// message</label>
                    <textarea 
                        id="message" 
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required 
                        rows="5" 
                        className="w-full bg-[#282c34] p-2 rounded-sm border border-gray-600 focus:outline-none focus:border-blue-400 resize-none"
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm transition-colors">
                    <span className="text-green-400">await</span> <span className="text-purple-400">dispatch</span>(<span className="text-amber-400">'SEND'</span>);
                </button>
            </div>
            <p>{"}"}</p>
             {status && (
                <div className={`mt-4 p-2 rounded-sm text-center ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {status.text}
                </div>
            )}
        </form>
    );
};

const InteractiveLog = ({ portfolioData }) => {
    const [messages, setMessages] = useState([
        { from: 'system', text: "System Status: Nominal. Listening for connections..." },
        { from: 'ai', text: "Hello! I am Shubham's AI assistant. Feel free to ask me anything about his profile." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        const systemPrompt = `You are a helpful and professional AI assistant for Shubham Awari, a CSE student. Your goal is to answer questions about him based on his portfolio information. Keep your answers concise and friendly. Here is his information:\n\nABOUT: ${portfolioData.about}\n\nSKILLS: ${portfolioData.skills.map(s=>s.name).join(', ')}\n\nPROJECTS: ${portfolioData.projects.map(p => p.title).join(', ')}.`;
        
        const chatHistory = newMessages.slice(-6).map(msg => ({
            role: msg.from === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));
        
        chatHistory.unshift({ role: 'user', parts: [{ text: systemPrompt }]});

        const payload = { contents: chatHistory };
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This will be handled by the environment, no need for process.env
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.";
            setMessages(prev => [...prev, { from: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { from: 'ai', text: "My apologies, I'm having trouble connecting to my network." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col font-fira text-left">
            <div className="flex-grow overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {msg.from === 'system' && <p><span className="text-green-400">[OK]</span> {msg.text}</p>}
                        {msg.from === 'ai' && <p><span className="text-blue-400">[AI]</span> {msg.text}</p>}
                        {msg.from === 'user' && <p><span className="text-amber-400">[USER]</span> {msg.text}</p>}
                    </div>
                ))}
                {isLoading && <p><span className="text-purple-400">[AI]</span> Thinking...</p>}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="flex-grow bg-[#282c34] p-2 rounded-sm border border-gray-600 focus:outline-none focus:border-blue-400"
                />
                <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 px-4 rounded-sm transition-colors disabled:bg-blue-900">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

// --- Main App ---

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
                <header>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Shubham Awari</h1>
                    <p className="text-base md:text-lg text-blue-400 font-fira mt-1">
                        <span className="text-purple-400">const</span> <span>ROLE</span> = <span className="text-amber-400">'CSE Student'</span>;
                    </p>
                </header>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-700 pointer-events-none">
                    <p className="font-fira text-sm">// Main module</p>
                    <h2 className="text-8xl md:text-9xl font-fira font-bold opacity-10">S</h2>
                </div>

                <nav className="w-full pointer-events-auto max-w-sm">
                   <p className="font-fira text-gray-500 text-sm mb-2">// Explore</p>
                   <div className="flex flex-col items-start space-y-2">
                    <button onClick={() => togglePanel('about')} className={navButtonClasses}><span>&gt;&gt;</span> <span>about.md</span></button>
                    <button onClick={() => togglePanel('projects')} className={navButtonClasses}><span>&gt;&gt;</span> <span>projects.json</span></button>
                    <button onClick={() => togglePanel('skills')} className={navButtonClasses}><span>&gt;&gt;</span> <span>skills.config</span></button>
                    <button onClick={() => togglePanel('contact')} className={navButtonClasses}><span>&gt;&gt;</span> <span>contact.ts</span></button>
                    <button onClick={() => togglePanel('status')} className={navButtonClasses}><span>&gt;&gt;</span> <span className="flex items-center">status.log <Sparkles className="ml-2 text-purple-400" size={16}/></span></button>
                    <a href="/resume.pdf" download="ShubhamAwari_Resume.pdf" className={navButtonClasses}><Download size={16} /> <span>resume.pdf</span></a>
                   </div>
                </nav>

                <footer className="w-full flex flex-wrap justify-between items-center gap-4 text-gray-500 font-fira">
                    <div className="hidden sm:block">main*</div>
                    <div className="flex items-center space-x-4 order-last sm:order-none">
                        <a href="https://github.com/shubham4653" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/shubhamawari/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="https://leetcode.com/u/shubhamawari/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><LeetCodeIcon /></a>
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
