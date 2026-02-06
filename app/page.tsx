'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import BookingForm from '@/components/BookingForm';
import FloatingCTA from '@/components/FloatingCTA';
import { dishes } from '@/lib/dishes';

export default function Home() {
    const [isCTAHidden, setIsCTAHidden] = useState(false);

    useEffect(() => {
        // Force scroll to top on initial load/refresh
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen">
            <Hero />
            <DishGrid dishes={dishes} />
            <BookingForm onStatusChange={(status) => setIsCTAHidden(status.success || status.isStep2)} />
            <FloatingCTA hidden={isCTAHidden} />

            {/* Decorative Spacer */}
            <div className="py-20 flex justify-center opacity-30">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
        </main>
    );
}
