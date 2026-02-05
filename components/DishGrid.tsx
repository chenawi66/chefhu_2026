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
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="menu">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400 mb-4"
                >
                    乙級檢定題組菜單
                </motion.h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    我們將依照每一次的練習主題，完整呈現該題組的 7 道經典料理。
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(groupedDishes).map(([series, groupDishes], i) => {
                    // Determine Image
                    const prefix = series.substring(0, 3);
                    const bgImage = seriesImages[prefix] || seriesImages['default'];

                    return (
                        <motion.div
                            key={series}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-green-500/50 transition-all duration-500"
                        >
                            {/* Card Header Image */}
                            <div className="relative h-48 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${bgImage})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />

                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full mb-2 inline-block shadow-lg">
                                        {groupDishes[0].category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white shadow-black drop-shadow-lg">
                                        {series} 題組
                                    </h3>
                                </div>
                            </div>

                            {/* Dish List */}
                            <div className="p-6">
                                <ul className="space-y-3">
                                    {groupDishes.map((dish, idx) => (
                                        <li key={dish.id} className="flex items-start gap-3 text-gray-300 group-hover:text-white transition-colors">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-900/50 border border-green-500/30 flex items-center justify-center text-xs text-green-400 mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span className="text-lg tracking-wide border-b border-white/5 pb-1 w-full block">
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
