'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 animate-float"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-400 uppercase bg-green-900/30 rounded-full border border-green-500/30 backdrop-blur-sm">
                        乙級學徒練工坊
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        中餐烹調的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">極致藝術</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                        從 105 道官方精選菜色中體驗傳統美味。
                        邀請您的親朋好友，享受專屬的品鑑時光。
                    </p>

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

            {/* Decorative Scroll Down */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                </div>
            </motion.div>
        </div>
    );
}
