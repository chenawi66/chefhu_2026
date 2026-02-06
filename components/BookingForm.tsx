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
            <div className="max-w-4xl mx-auto p-12 md:p-24 text-center glass-card rounded-none my-24 border-green-500/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 h-[500px] overflow-hidden border border-white/20 shadow-2xl">
                    <img src="/images/cat.jpg" alt="胡主廚的貓" className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500 flex items-center justify-center mb-8 shadow-lg shadow-green-500/50"
                    >
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </motion.div>
                    <h3 className="text-5xl font-black text-white mb-6 tracking-widest">席位已預約</h3>
                    <p className="text-2xl text-gray-300 font-bold tracking-wide leading-relaxed mb-10">
                        我們已收到您的預約請求：<br />
                        <span className="text-green-400 font-black">{selectedDate} / 18:00</span><br />
                        我們將盡快與您用Line聯繫。
                    </p>
                    <button
                        onClick={() => { setSuccess(false); setStep(1); setSelectedDate(''); setSelectedTime(''); }}
                        className="px-12 py-4 bg-white/10 hover:bg-white/20 text-white transition font-black tracking-[0.2em] border border-white/20"
                    >
                        再次預約
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="py-24 px-4 bg-black relative" id="book">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-widest">預約席位</h2>
                    <p className="text-green-500 font-bold tracking-[0.4em] text-xl">「 在光影交錯的練工坊，為您留下一席之地 」</p>
                </div>

                <div className="bg-zinc-900 border border-white/10 p-8 md:p-16">
                    <div className="flex gap-12 mb-16 border-b border-white/5 pb-8">
                        <button
                            onClick={() => setStep(1)}
                            className={`text-2xl font-black transition-all tracking-widest ${step === 1 ? 'text-green-500 border-b-4 border-green-500 pb-2' : 'text-zinc-700 hover:text-zinc-500'}`}
                        >
                            01. 擇日
                        </button>
                        <button
                            onClick={() => step > 1 && setStep(2)}
                            disabled={step < 2}
                            className={`text-2xl font-black transition-all tracking-widest ${step === 2 ? 'text-green-500 border-b-4 border-green-500 pb-2' : 'text-zinc-700 hover:text-zinc-500'}`}
                        >
                            02. 席記
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col lg:flex-row gap-16"
                            >
                                <div className="lg:w-2/3 space-y-12">
                                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-8">
                                        <p className="text-yellow-500 font-black text-2xl tracking-widest">時段預設：每週六 18:00</p>
                                    </div>

                                    <div>
                                        <label className="block text-xl font-black text-white mb-8 tracking-[0.2em]">選擇日期</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {slots.map(slot => (
                                                <button
                                                    key={slot.date}
                                                    onClick={() => {
                                                        setSelectedDate(slot.date);
                                                        setSelectedTime('18:00');
                                                    }}
                                                    className={`p-8 border-2 text-center transition-all duration-300 ${selectedDate === slot.date
                                                        ? 'border-green-500 bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                                                        : 'border-white/5 bg-white/5 text-zinc-500 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="text-3xl font-black leading-none">{new Date(slot.date).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}</div>
                                                    <div className="text-sm font-bold mt-2 opacity-60 tracking-widest">{new Date(slot.date).toLocaleDateString('zh-TW', { weekday: 'long' })}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-12">
                                        <button
                                            disabled={!selectedDate}
                                            onClick={() => setStep(2)}
                                            className="px-20 py-6 bg-green-500 hover:bg-green-400 text-black font-black text-2xl shadow-[0_15px_50px_rgba(34,197,94,0.2)] disabled:opacity-30 disabled:grayscale transition-all transform hover:-translate-y-1"
                                        >
                                            下一步
                                        </button>
                                    </div>
                                </div>

                                {/* Sidebar Cat Image - Direct and Parallel with Dates */}
                                <div className="lg:w-1/3">
                                    <div className="h-full min-h-[450px] border border-white/10 relative overflow-hidden group">
                                        <img
                                            src="/images/cat.jpg"
                                            alt="胡主廚的貓"
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none"></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-xl font-black text-white tracking-[0.2em]">平常我們是怎麼稱呼你的</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-zinc-800 p-6 border-2 border-white/10 focus:border-green-500 outline-none transition-all text-white text-2xl placeholder-zinc-600 font-bold rounded-none"
                                            placeholder="請輸入姓名"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xl font-black text-white tracking-[0.2em]">Line ID</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-zinc-800 p-6 border-2 border-white/10 focus:border-green-500 outline-none transition-all text-white text-2xl placeholder-zinc-600 font-bold rounded-none"
                                            placeholder="請輸入正確的 Line ID"
                                        />
                                        <p className="text-lg text-zinc-400 font-bold tracking-wider">我們會以 Line 進行預約確認與提供詳細地址</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xl font-black text-white tracking-[0.2em]">同行夥伴</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.relationship}
                                        onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                                        className="w-full bg-zinc-800 p-6 border-2 border-white/10 focus:border-green-500 outline-none transition-all text-white text-2xl placeholder-zinc-600 font-bold rounded-none"
                                        placeholder="如認識請填「常用稱呼」，若不認識請填「新朋友」"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xl font-black text-white tracking-[0.2em]">出席人數 (4~6位)</label>
                                    <div className="flex flex-col md:flex-row items-center gap-12 p-10 bg-black/50 border-2 border-white/5">
                                        <div className="flex-grow text-zinc-300 font-bold text-2xl tracking-widest leading-relaxed">
                                            本次活動接受 4 到 6 位預約
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {[4, 5, 6].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, guests: num })}
                                                    className={`w-20 h-20 flex items-center justify-center transition-all text-3xl font-black rounded-none ${formData.guests === num
                                                        ? 'bg-green-500 text-black shadow-2xl scale-110'
                                                        : 'bg-zinc-800 text-zinc-500 hover:text-white border border-white/5'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-10 border border-white/10 space-y-8">
                                    <div className="flex justify-between items-center text-2xl">
                                        <span className="text-zinc-400 font-black tracking-widest">預計日期</span>
                                        <span className="text-white font-black">{selectedDate} / 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-white/10 pt-8">
                                        <span className="text-zinc-400 font-black tracking-widest">食材費合計</span>
                                        <div className="text-right">
                                            <span className="text-green-500 text-6xl font-black tracking-tighter">{formData.guests * 300}</span>
                                            <span className="text-green-500 text-2xl font-black ml-2">元</span>
                                        </div>
                                    </div>
                                    <div className="text-lg text-zinc-500 space-y-4 border-t border-white/10 pt-8 font-bold italic">
                                        <p className="flex items-center gap-4"><span className="w-3 h-3 bg-green-500"></span> 可自備酒水，免收開瓶費，現場提供紅酒杯。</p>
                                        <p className="flex items-center gap-4"><span className="w-3 h-3 bg-green-500"></span> 菜色由胡主廚依題組隨機挑選練習。</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-zinc-600 hover:text-white transition-colors tracking-widest font-black text-xl"
                                    >
                                        ← 返回
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-24 py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-2xl shadow-2xl disabled:opacity-30 transition-all transform hover:-translate-y-1"
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
