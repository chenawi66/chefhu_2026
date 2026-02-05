'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 500px or if reaching the menu
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBook = () => {
        const bookSection = document.getElementById('book');
        if (bookSection) {
            bookSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    className="fixed bottom-8 right-8 z-[100] md:hidden"
                >
                    <button
                        onClick={scrollToBook}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.5)] font-bold transition-transform hover:scale-105 active:scale-95 border-2 border-white/20"
                    >
                        🍽️ 立即預約席位
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
