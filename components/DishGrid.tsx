'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Dish, dishes, dateSeriesMapping } from '@/lib/dishes';

interface DishGridProps {
    dishes: Dish[];
    slots: any[];
    onSelectDate: (date: string) => void;
}

export default function DishGrid({ dishes, slots, onSelectDate }: DishGridProps) {
    const [showAlert, setShowAlert] = useState(false);

    // Group dishes by Series (201A, 201B...)
    const groupedDishes = dishes.reduce((acc: Record<string, Dish[]>, dish: Dish) => {
        if (!acc[dish.series]) {
            acc[dish.series] = [];
        }
        acc[dish.series].push(dish);
        return acc;
    }, {} as Record<string, Dish[]>);

    const handleBookClick = (date: string) => {
        // Find if this date is in available slots
        const isAvailable = slots.some(s => s.date === date && s.times.includes('18:00'));
        if (isAvailable) {
            onSelectDate(date);
        } else {
            setShowAlert(true);
        }
    };

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
                    // Use prep.jpg as a reliable local fallback if Unsplash fails
                    const bgImage = "/images/prep.jpg";
                    const mappingDate = Object.entries(dateSeriesMapping).find(([_, s]) => s === series)?.[0];

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
                                { /* Category tag removed */}
                            </div>

                            {/* Content Area */}
                            <div className="p-6 md:p-14 flex-grow flex flex-col justify-center">
                                <div className="mb-6 md:mb-8 border-b border-green-500/30 pb-4">
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="text-green-500 font-black text-4xl md:text-6xl tracking-widest leading-none">
                                            {mappingDate && new Date(mappingDate).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-400 tracking-[0.2em] leading-none">
                                        題組：{series}
                                    </h3>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-6 mb-8 md:mb-12">
                                    {groupDishes.map((dish, idx) => (
                                        <li key={dish.id} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-500 flex items-center justify-center text-xs md:text-sm font-black text-black mt-1">
                                                {idx + 1}
                                            </span>
                                            <span className="text-lg md:text-2xl font-bold text-gray-100 tracking-wide leading-snug">
                                                {dish.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {mappingDate && (
                                    <button
                                        onClick={() => handleBookClick(mappingDate)}
                                        className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black text-lg tracking-[0.4em] transition-all transform hover:-translate-y-1 shadow-lg shadow-green-500/20"
                                    >
                                        我要預定
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Custom Alert Modal */}
            <AnimatePresence>
                {showAlert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-zinc-900 border border-white/20 p-8 md:p-12 max-w-md w-full relative"
                        >
                            <button
                                onClick={() => setShowAlert(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 border border-red-500/30">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-widest">此時段已有人預約</h3>
                                <p className="text-gray-400 text-lg mb-8 font-light">
                                    很抱歉，該場次席位已額滿。<br />請參考其他日期的品鑑場次。
                                </p>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black tracking-widest transition-all border border-white/20"
                                >
                                    返回菜單
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
