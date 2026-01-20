import React, { useState } from 'react';
import { Sparkles, Send, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleGenerateMessage = async () => {
        if (!keywords) {
            setStatus({ text: 'Please enter keywords first.', type: 'error' });
            return;
        }
        setIsGenerating(true);
        setStatus({ text: 'Generating draft...', type: 'info' });

        const prompt = `Write a short, professional but friendly message to a CSE student named Shubham, based on these keywords: "${keywords}". The message should be suitable for a recruiter or professional reaching out for the first time. Keep it under 50 words.`;

        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
            setStatus({ text: "AI generation failed.", type: "error" });
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
            // Using the existing key from previous code
            data.append("access_key", "00f92614-e01c-4596-b25a-f78c5b7a7b1e");
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (result.success) {
                setStatus({ text: 'Message sent successfully!', type: 'success' });
                setShowConfetti(true);
                form.reset();
                setMessage('');
                setKeywords('');
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus({ text: result.message, type: 'error' });
            }
        } catch (error) {
            setStatus({ text: 'An error occurred.', type: 'error' });
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4">
                        Let's Connect
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 pl-12 pr-4 text-slate-800 dark:text-slate-200 outline-none focus:border-cyan-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                            </div>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Your Email"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 pl-12 pr-4 text-slate-800 dark:text-slate-200 outline-none focus:border-cyan-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-500 dark:text-slate-400 ml-1 flex items-center justify-between">
                                <span>Message</span>
                                <span className="text-xs text-purple-500 dark:text-purple-400 flex items-center gap-1">
                                    <Sparkles size={12} /> AI Powered
                                </span>
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="Enter keywords for AI generation (e.g. 'hiring for react role')..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 px-4 text-slate-800 dark:text-slate-200 text-sm outline-none focus:border-purple-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={handleGenerateMessage}
                                    disabled={isGenerating}
                                    className="bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-600/50 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                                </button>
                            </div>

                            <div className="relative group">
                                <MessageSquare className="absolute left-4 top-4 text-slate-400 dark:text-slate-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows="5"
                                    placeholder="Your message details..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 pl-12 pr-4 text-slate-800 dark:text-slate-200 outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Send size={20} /> Send Message
                        </button>
                    </form>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-4 rounded-lg text-center ${status.type === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' :
                                    status.type === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' :
                                        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                }`}
                        >
                            {status.text}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
