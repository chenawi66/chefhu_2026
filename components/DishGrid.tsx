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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {Object.entries(groupedDishes).map(([series, groupDishes], i) => {
                    return (
                        <motion.div
                            key={series}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-green-500/30 transition-all duration-500"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                    <h3 className="text-2xl font-bold text-white tracking-widest">
                                        {series} <span className="text-sm font-light text-gray-500 ml-2">題組</span>
                                    </h3>
                                    <span className="px-3 py-1 text-[10px] font-bold text-black bg-yellow-400 rounded-full shadow-lg h-fit">
                                        {groupDishes[0].category}
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {groupDishes.map((dish, idx) => (
                                        <li key={dish.id} className="flex items-start gap-4 text-gray-400 group-hover:text-white transition-colors">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-500 mt-1">
                                                {idx + 1}
                                            </span>
                                            <span className="text-base tracking-wide py-0.5 border-b border-white/5 w-full block">
                                                {dish.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent -mr-10 -mt-10 rounded-full blur-xl group-hover:bg-green-500/20 transition-all" />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
