'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
    useEffect(() => {
        // Force manual scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Scroll to top immediately
        window.scrollTo(0, 0);

        // Multiple attempts to ensure it works across different browsers and network speeds
        const timer1 = setTimeout(() => window.scrollTo(0, 0), 0);
        const timer2 = setTimeout(() => window.scrollTo(0, 0), 100);
        const timer3 = setTimeout(() => window.scrollTo(0, 0), 500);

        // Event listener for beforeunload to ensure we set it to top before refresh starts
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return null;
}
