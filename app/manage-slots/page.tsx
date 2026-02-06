'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ManageSlots() {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const allSaturdays = [
        "2026-03-07", "2026-03-14", "2026-03-21",
        "2026-04-11", "2026-04-18", "2026-04-25",
        "2026-05-02", "2026-05-09", "2026-05-16",
        "2026-06-13", "2026-06-20", "2026-06-27"
    ];

    const refreshSlots = async (pwd: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/slots');
            const data = await res.json();
            setSlots(data);
            setIsAuthorized(true);
        } catch (error) {
            setMessage('無法獲取資料');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action: string, date?: string, time?: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/manage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, action, date, time })
            });
            const data = await res.json();
            if (data.success) {
                setSlots(data.slots);
                setMessage('操作成功！');
            } else {
                setMessage('操作失敗：' + (data.error || '密碼錯誤'));
            }
        } catch (error) {
            setMessage('發生錯誤');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-10">
                    <h1 className="text-3xl font-black text-white mb-8 text-center">後台管理</h1>
                    <input
                        type="password"
                        placeholder="輸入管理密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black p-4 border border-white/20 text-white mb-6 focus:border-green-500 outline-none"
                    />
                    <button
                        onClick={() => refreshSlots(password)}
                        className="w-full bg-green-500 p-4 text-black font-black uppercase tracking-widest"
                    >
                        進入管理
                    </button>
                    {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8 md:p-20 text-white font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black tracking-widest">日期管理後台</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleAction('reset')}
                            className="px-6 py-2 border border-yellow-500 text-yellow-500 font-bold"
                        >
                            重設為預設值
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-2 border border-white/20 hover:bg-white/10"
                        >
                            返回首頁
                        </button>
                    </div>
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500 text-black p-4 mb-8 font-bold text-center"
                    >
                        {message}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {allSaturdays.map(date => {
                        const isOpened = slots.some(s => s.date === date && s.times.includes('18:00'));
                        return (
                            <div key={date} className="flex items-center justify-between p-6 bg-zinc-900 border border-white/5">
                                <div>
                                    <span className="text-2xl font-black mr-6">{date}</span>
                                    <span className="text-zinc-500">週六 18:00</span>
                                </div>
                                <button
                                    onClick={() => handleAction(isOpened ? 'close' : 'open', date, '18:00')}
                                    disabled={loading}
                                    className={`px-10 py-3 font-black tracking-widest transition-all ${isOpened
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white'
                                            : 'bg-green-500 text-black hover:bg-green-400'
                                        }`}
                                >
                                    {isOpened ? '關閉預約' : '開放預約'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
