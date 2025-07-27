import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download, Sparkles, Send, Code, Database, Wind, GitBranch, Bot, Tv, Palette, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
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

export default ContactForm;
