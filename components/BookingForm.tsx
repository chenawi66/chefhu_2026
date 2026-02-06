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

    const isStep1Valid = selectedDate && selectedTime;

    if (success) {
        return (
            <div className="max-w-2xl mx-auto p-12 text-center glass-card rounded-2xl my-24 border-green-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 opacity-30 pointer-events-none">
                    <img src="/images/cat.jpg" alt="Cat" className="w-full h-full object-cover rounded-bl-[100px] border-l border-b border-white/20" />
                </div>
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
                >
                    <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">席位已預約</h3>
                <p className="text-gray-300 font-light tracking-wide">
                    我們已收到您預約 {selectedDate} 的請求。<br />
                    我們將盡快與您用Line聯繫。
                </p>
                <button
                    onClick={() => { setSuccess(false); setStep(1); setSelectedDate(''); setSelectedTime(''); }}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-light"
                >
                    再次預約
                </button>
            </div>
        );
    }

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-black/80 relative" id="book">
            {/* Decorative Cat Image - Enhanced design */}
            <div className="absolute bottom-10 left-10 w-80 h-80 opacity-20 pointer-events-none z-0 hidden lg:block">
                <img src="/images/cat.jpg" alt="Cat Decoration" className="w-full h-full object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000 rotate-3 border-4 border-white/5" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">預約您的席位</h2>
                    <p className="text-gray-400 font-light italic">「在光影交錯的練工坊，為您留下一席之地。」</p>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between mb-12 border-b border-white/5 pb-6">
                        <button
                            onClick={() => setStep(1)}
                            className={`text-xl font-bold px-6 py-3 rounded-xl transition-all ${step === 1 ? 'text-green-400 bg-green-400/10 shadow-inner' : 'text-gray-600'}`}
                        >
                            01. 擇日
                        </button>
                        <button
                            onClick={() => step > 1 && setStep(2)}
                            disabled={step < 2}
                            className={`text-xl font-bold px-6 py-3 rounded-xl transition-all ${step === 2 ? 'text-green-400 bg-green-400/10 shadow-inner' : 'text-gray-600'}`}
                        >
                            02. 席記
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-10"
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-8 bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-2xl">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-ping"></div>
                                        <p className="text-yellow-500 font-bold tracking-widest uppercase">席次時段：每週六 18:00</p>
                                    </div>
                                    <label className="block text-sm font-bold text-gray-500 mb-6 tracking-[0.2em] uppercase">選擇日期</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {slots.map(slot => (
                                            <button
                                                key={slot.date}
                                                onClick={() => {
                                                    setSelectedDate(slot.date);
                                                    setSelectedTime('18:00');
                                                }}
                                                className={`p-6 rounded-2xl border-2 text-center transition-all duration-500 ${selectedDate === slot.date
                                                    ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-105'
                                                    : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className="text-2xl font-black">{new Date(slot.date).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}</div>
                                                <div className="text-sm opacity-60 mt-2 font-medium tracking-widest">{new Date(slot.date).toLocaleDateString('zh-TW', { weekday: 'long' })}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        disabled={!selectedDate}
                                        onClick={() => setStep(2)}
                                        className="px-14 py-5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-black text-lg rounded-full shadow-[0_10px_40px_rgba(21,128,61,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
                                    >
                                        繼續預約
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
                                className="space-y-10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">姓名</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/10 p-5 rounded-2xl border-2 border-white/10 focus:border-green-500/50 focus:bg-white/20 outline-none transition-all text-white placeholder-gray-600 font-medium"
                                            placeholder="請輸入您的真實姓名"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">Line ID</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/10 p-5 rounded-2xl border-2 border-white/10 focus:border-green-500/50 focus:bg-white/20 outline-none transition-all text-white placeholder-gray-600 font-medium"
                                            placeholder="請輸入正確的 Line ID"
                                        />
                                        <p className="text-[10px] text-gray-500 tracking-wider">我們會以 Line 進行預約確認與提供詳細地址</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">同行夥伴</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.relationship}
                                        onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                                        className="w-full bg-white/10 p-5 rounded-2xl border-2 border-white/10 focus:border-green-500/50 focus:bg-white/20 outline-none transition-all text-white placeholder-gray-600 font-medium"
                                        placeholder="如認識請填常用稱呼，若不認識請填「新朋友」"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">出席人數 (4~6位)</label>
                                    <div className="flex items-center gap-8 p-8 bg-black/40 rounded-3xl border-2 border-white/5">
                                        <div className="flex-grow text-gray-400 font-light text-lg">
                                            本次活動接受 4 到 6 位預約
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {[4, 5, 6].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, guests: num })}
                                                    className={`w-16 h-16 flex items-center justify-center rounded-2xl border-2 transition-all text-xl font-black ${formData.guests === num
                                                        ? 'bg-green-500 border-green-400 text-black shadow-[0_10px_30px_rgba(34,197,94,0.4)] scale-110'
                                                        : 'border-white/10 hover:border-white/30 text-gray-600 hover:text-white'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-sm text-gray-400 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="font-light tracking-widest">預計日期</span>
                                        <span className="text-white font-bold text-lg">{selectedDate} / 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-white/5 pt-6">
                                        <span className="font-light tracking-widest">食材費合計 ({formData.guests}位)</span>
                                        <div className="text-right">
                                            <span className="text-green-400 text-4xl font-black tracking-tighter">{formData.guests * 300}</span>
                                            <span className="text-green-400 text-sm font-bold ml-2">元</span>
                                            <p className="text-[11px] text-gray-600 mt-2 font-bold uppercase tracking-widest">NTD 300 PER GUEST</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 space-y-3 border-t border-white/5 pt-6 font-medium italic">
                                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 可自備酒水，免收開瓶費，現場提供紅酒杯。</p>
                                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 菜色由胡主廚依題組隨機挑選練習。</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-gray-600 hover:text-white transition-colors tracking-[0.3em] font-bold uppercase"
                                    >
                                        ← 返回
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-16 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-black text-xl rounded-full shadow-[0_15px_50px_rgba(202,138,4,0.3)] disabled:opacity-50 transition-all transform hover:-translate-y-1 flex items-center gap-3"
                                    >
                                        {loading ? '記名中...' : '確認預約'}
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
