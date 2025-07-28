import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download, Sparkles, Send, Code, Database, Wind, GitBranch, Bot, Tv, Palette, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



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
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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

export default InteractiveLog;