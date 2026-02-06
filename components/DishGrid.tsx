'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Dish {
    id: string;
    name: string;
    category: string;
    series: string;
}

interface DishGridProps {
    dishes: Dish[];
}

// Images for different sets to maintain visual consistency
const seriesImages: Record<string, string> = {
    '201': 'https://images.unsplash.com/photo-1563245372-f21720e32c4d?auto=format&fit=crop&w=800&q=80',
    '202': 'https://images.unsplash.com/photo-1606850740922-b9e776269b2d?auto=format&fit=crop&w=800&q=80',
    '203': 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&w=800&q=80',
    'default': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
};

export default function DishGrid({ dishes }: DishGridProps) {
    // Group dishes by Series (201A, 201B...)
    const groupedDishes = dishes.reduce((acc, dish) => {
        if (!acc[dish.series]) {
            acc[dish.series] = [];
        }
        acc[dish.series].push(dish);
        return acc;
    }, {} as Record<string, Dish[]>);

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden" id="menu">
            {/* Background Decorative Image - Increased visibility */}
            <div className="absolute top-20 right-0 w-1/2 h-1/2 opacity-20 pointer-events-none z-0">
                <img src="/images/prep.jpg" alt="Prep" className="w-full h-full object-cover rounded-full blur-xl" />
            </div>

            <div className="text-center mb-8 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400 mb-2"
                >
                    乙級檢定題組菜單
                </motion.h2>
                <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide italic">
                    「一場關於匠心與美味的練習，在刀工與火候中追尋極致。」
                </p>
            </div>

            <div className="grid grid-cols-1 gap-16 relative z-10 max-w-5xl mx-auto">
                {Object.entries(groupedDishes).map(([series, groupDishes], i) => {
                    const prefix = series.substring(0, 3);
                    // Use prep.jpg as a reliable local fallback if Unsplash fails
                    const bgImage = "/images/prep.jpg";

                    return (
                        <motion.div
                            key={series}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col md:flex-row overflow-hidden bg-zinc-900 border border-white/10 hover:border-green-500/50 transition-all duration-500"
                        >
                            {/* Card Image - Clear and Direct */}
                            <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative bg-zinc-800">
                                <img
                                    src={bgImage}
                                    alt={series}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-0 left-0">
                                    <span className="px-6 py-2 text-sm font-black text-black bg-yellow-400 tracking-widest">
                                        {groupDishes[0].category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-10 md:p-14 flex-grow flex flex-col justify-center">
                                <div className="mb-8 border-b border-green-500/30 pb-4">
                                    <h3 className="text-5xl font-black text-white tracking-[0.2em] leading-none mb-2">
                                        {series}
                                    </h3>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                    {groupDishes.map((dish, idx) => (
                                        <li key={dish.id} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 bg-green-500 flex items-center justify-center text-sm font-black text-black mt-1">
                                                {idx + 1}
                                            </span>
                                            <span className="text-xl md:text-2xl font-bold text-gray-100 tracking-wide leading-snug">
                                                {dish.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
