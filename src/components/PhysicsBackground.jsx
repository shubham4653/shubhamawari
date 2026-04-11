import React, { useEffect, useRef, useState } from 'react';

const PhysicsBackground = () => {
    const canvasRef = useRef(null);
    const [isDark, setIsDark] = useState(true);

    // Physics constants
    const FRICTION = 0.98;
    const MOUSE_REPULSION = 1.5;
    const MAX_SPEED = 4;

    // Elements to float - Focused on Tech & Design
    const WORD_LIST = [
        "React", "Node.js", "MongoDB", "Express",
        "Tailwind", "Framer", "Git", "Java", "Python",
        "Code", "Design", "Create", "Build", "React",
        "JavaScript", "TypeScript", "HTML5", "CSS",
        "C++", "GitHub"];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Initialize elements scattered across the screen
        const elements = WORD_LIST.map(word => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            text: word,
            size: 14 + Math.random() * 20, // Varied sizes
            rotation: (Math.random() - 0.5) * 0.5
        }));

        let mouse = { x: -1000, y: -1000 };

        // Track global mouse movement
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Theme check
        const checkTheme = () => {
            // We can check the class on html element
            const dark = document.documentElement.classList.contains('dark');
            setIsDark(dark);
            return dark;
        };

        const render = () => {
            const isDarkMode = checkTheme();

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Update & Draw
            elements.forEach(el => {
                // Physics
                el.x += el.vx;
                el.y += el.vy;

                // Bounce off walls
                if (el.x < 0 || el.x > width) el.vx *= -1;
                if (el.y < 0 || el.y > height) el.vy *= -1;

                // Keep inside (soft clamp)
                if (el.x < 0) el.x = 0;
                if (el.x > width) el.x = width;
                if (el.y < 0) el.y = 0;
                if (el.y > height) el.y = height;

                // Mouse Interaction (Global Repulsion)
                const dx = mouse.x - el.x;
                const dy = mouse.y - el.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction radius
                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (200 - distance) / 200;
                    el.vx -= Math.cos(angle) * force * MOUSE_REPULSION;
                    el.vy -= Math.sin(angle) * force * MOUSE_REPULSION;
                }

                // Friction / Damping
                el.vx *= FRICTION;
                el.vy *= FRICTION;

                // Cap Speed
                const speed = Math.sqrt(el.vx * el.vx + el.vy * el.vy);
                if (speed > MAX_SPEED) {
                    el.vx = (el.vx / speed) * MAX_SPEED;
                    el.vy = (el.vy / speed) * MAX_SPEED;
                }

                // Random gentle drift if too slow
                if (speed < 0.2) {
                    el.vx += (Math.random() - 0.5) * 0.2;
                    el.vy += (Math.random() - 0.5) * 0.2;
                }

                // Draw
                ctx.save();
                ctx.translate(el.x, el.y);
                ctx.rotate(el.rotation * (el.vx + el.vy)); // Subtle rotation based on movement
                ctx.font = `bold ${el.size}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Text Color - Low opacity for background effect
                if (isDarkMode) {
                    // Cyan/Blue hints, low opacity
                    ctx.fillStyle = `rgba(34, 211, 238, ${0.1 + (speed / MAX_SPEED) * 0.2})`;
                } else {
                    // Slate/Blue hints, low opacity
                    ctx.fillStyle = `rgba(37, 99, 235, ${0.05 + (speed / MAX_SPEED) * 0.15})`;
                }

                ctx.fillText(el.text, 0, 0);
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default PhysicsBackground;
