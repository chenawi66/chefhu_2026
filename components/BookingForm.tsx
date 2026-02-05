'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
    date: string;
    times: string[];
}

export default function BookingForm() {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        relationship: '',
        guests: 4
    });

    useEffect(() => {
        fetch('/api/slots')
            .then(res => res.json())
            .then(data => setSlots(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    date: selectedDate,
                    time: selectedTime,
                    guests: Number(formData.guests)
                })
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                alert(`預約失敗: ${data.error || '未知錯誤'}`);
            }
        } catch (err) {
            console.error(err);
            alert('發生錯誤，請檢查伺服器連線或是終端機的錯誤訊息。');
        } finally {
            setLoading(false);
        }
    };

    const availableTimes = slots.find(s => s.date === selectedDate)?.times || [];

    if (success) {
        return (
            <div className="max-w-2xl mx-auto p-12 text-center glass-card rounded-2xl my-24 border-green-500/30">
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
                >
                    <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">預約申請已發送！</h3>
                <p className="text-gray-300">
                    我們已收到您預約 {selectedDate} {selectedTime} 的請求。<br />
                    請耐心等候，我們將盡快與您聯繫確認。
                </p>
                <button
                    onClick={() => { setSuccess(false); setStep(1); setSelectedDate(''); setSelectedTime(''); }}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                    再次預約
                </button>
            </div>
        );
    }

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-black/80" id="book">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">預約您的席位</h2>
                    <p className="text-gray-400">參加乙級學徒練工坊（可自備酒水，免開瓶費）</p>
                </div>

                <div className="glass-card rounded-2xl p-6 md:p-10">
                    <div className="flex justify-between mb-8 border-b border-white/10 pb-4">
                        <button
                            onClick={() => setStep(1)}
                            className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${step === 1 ? 'text-green-400 bg-green-400/10' : 'text-gray-500'}`}
                        >
                            1. 日期與時段
                        </button>
                        <button
                            onClick={() => step > 1 && setStep(2)}
                            disabled={step < 2}
                            className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${step === 2 ? 'text-green-400 bg-green-400/10' : 'text-gray-500'}`}
                        >
                            2. 聯絡資訊
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                                        <p className="text-yellow-500 font-medium">時段固定為：每週六 18:00</p>
                                    </div>
                                    <label className="block text-sm font-medium text-gray-400 mb-4">選擇日期</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {slots.map(slot => (
                                            <button
                                                key={slot.date}
                                                onClick={() => {
                                                    setSelectedDate(slot.date);
                                                    setSelectedTime('18:00');
                                                }}
                                                className={`p-4 rounded-xl border text-center transition-all ${selectedDate === slot.date
                                                    ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                                    : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="text-lg font-bold">{new Date(slot.date).toLocaleDateString()}</div>
                                                <div className="text-xs opacity-70 mt-1">{new Date(slot.date).toLocaleDateString('zh-TW', { weekday: 'long' })}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        disabled={!selectedDate}
                                        onClick={() => setStep(2)}
                                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-lg shadow-lg shadow-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
                                    >
                                        下一步
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">姓名</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full glass-input p-4 rounded-lg"
                                            placeholder="王小明"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">電話號碼</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full glass-input p-4 rounded-lg"
                                            placeholder="0911-234-567"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">其他三位是誰</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.relationship}
                                        onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                                        className="w-full glass-input p-4 rounded-lg"
                                        placeholder="如果我們認識請填常用稱呼，如果不認識請填新朋友"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">參加人數 (固定)</label>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="flex-grow text-gray-300">
                                            本次試吃活動需剛好 4 人成行
                                        </div>
                                        <div className="w-16 h-12 flex items-center justify-center bg-green-500/20 text-green-400 rounded-lg font-bold text-xl border border-green-500/50">
                                            {formData.guests}
                                        </div>
                                    </div>
                                    <p className="text-xs text-yellow-500/80 mt-2">* 系統已預設為 4 人</p>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-sm text-gray-400">
                                    <div className="flex justify-between mb-2">
                                        <span>日期</span>
                                        <span className="text-white">{selectedDate}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>時間</span>
                                        <span className="text-white">18:00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                                        <span>食材費 (4人方案)</span>
                                        <span className="text-green-400 font-bold">1,400 元</span>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-4 space-y-2 border-t border-white/5 pt-4">
                                        <p>• 可自備酒水，免收開瓶費，現場提供紅酒杯。</p>
                                        <p>• 菜色由胡主廚依題組隨機挑選練習。</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                                    >
                                        上一步
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-grow ml-4 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold rounded-lg shadow-lg shadow-yellow-900/50 disabled:opacity-50 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                                    >
                                        {loading ? '處理中...' : '確認預約'}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
