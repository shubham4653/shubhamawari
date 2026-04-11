import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Sync state with current document class
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = async (e) => {
    if (!document.startViewTransition) {
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        setIsDark(true);
      }
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
          setIsDark(false);
        } else {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
          setIsDark(true);
        }
      });
    });

    await transition.ready;

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 700,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold font-mono">
              SA
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              shubhamawari<span className="text-cyan-500 dark:text-cyan-400">.me</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                className="px-4 py-2 rounded-md text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="block w-full text-center mt-4 px-5 py-3 rounded-md font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
