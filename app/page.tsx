'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import BookingForm from '@/components/BookingForm';
import { dishes } from '@/lib/dishes';

export default function Home() {
    const [slots, setSlots] = useState<any[]>([]);
    const [jumpDate, setJumpDate] = useState<string | null>(null);

    useEffect(() => {
        // Initial fetch
        fetch('/api/slots')
            .then(res => res.json())
            .then(data => setSlots(data));
    }, []);

    const handleSelectDate = (date: string) => {
        setJumpDate(date);
        // Step back to 1 if we're jumping from menu
        const section = document.getElementById('book');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen">
            <Hero />
            <DishGrid
                dishes={dishes}
                slots={slots}
                onSelectDate={handleSelectDate}
            />
            <BookingForm
                jumpDate={jumpDate}
            />

            {/* Decorative Spacer */}
            <div className="py-20 flex justify-center opacity-30">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
        </main>
    );
}
