'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, ClipboardEdit, Utensils, ChevronRight } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-100 animate-float"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url("/images/atmosphere.jpg")'
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-24 pb-16 md:pt-0 md:pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-5 py-2 mb-4 text-base font-semibold tracking-wider text-green-400 uppercase bg-green-900/40 rounded-full border border-green-500/30 backdrop-blur-sm shadow-lg shadow-green-500/10">
                        乙級學徒練功坊
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        中餐烹調的 <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">極致藝術</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        從 105 道官方精選菜色中體驗傳統美味。<br />
                        邀請您的親朋好友，享受專屬的品鑑時光。
                    </p>

                    {/* Booking Process Flowchart */}
                    <div className="hidden md:flex items-center justify-center gap-2 mb-14 max-w-6xl mx-auto px-4">
                        {[
                            { icon: Users, text: "找尋飯友", sub: "每組 4~6 位" },
                            { icon: Calendar, text: "預約時間", sub: "預約可行時間" },
                            { icon: ClipboardEdit, text: "留下資訊", sub: "留下聯絡資訊" },
                            { icon: Utensils, text: "享用佳餚", sub: "老宅裡的國家級檢定用菜" }
                        ].map((step, index, array) => (
                            <div key={index} className="flex items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex flex-col items-center group w-48"
                                >
                                    <div className="relative mb-4">
                                        <span className="absolute -top-3 -left-4 text-green-400 font-bold italic text-2xl select-none group-hover:scale-110 transition-transform duration-300">
                                            {index + 1}
                                        </span>
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm">
                                            <step.icon className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    </div>
                                    <div className="text-white font-semibold text-base mb-1.5 whitespace-nowrap">{step.text}</div>
                                    <div className="text-gray-400 text-xs whitespace-normal opacity-80 h-8 flex items-center text-center">{step.sub}</div>
                                </motion.div>
                                {index < array.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="mb-12"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white/20" />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Flowchart */}
                    <div className="grid grid-cols-2 gap-4 md:hidden mb-12 px-4">
                        {[
                            { icon: Users, text: "找尋飯友", sub: "每組 4~6 位" },
                            { icon: Calendar, text: "預約時間", sub: "預約可行時間" },
                            { icon: ClipboardEdit, text: "留下資訊", sub: "留下聯絡資訊" },
                            { icon: Utensils, text: "享用佳餚", sub: "老宅裡的國家級檢定用菜" }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <span className="absolute top-2 left-3 text-green-400/80 font-bold italic text-lg">
                                    {index + 1}
                                </span>
                                <step.icon className="w-6 h-6 text-green-400 mb-3" />
                                <div className="text-white text-base font-semibold mb-1">{step.text}</div>
                                <div className="text-gray-400 text-[11px] leading-tight">{step.sub}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 w-full sm:w-auto"
                        >
                            立即預約
                        </button>
                        <button
                            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-medium transition-all w-full sm:w-auto"
                        >
                            查看菜單
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
