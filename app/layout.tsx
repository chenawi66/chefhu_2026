import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: '乙級學徒練工坊 - 頂級宴席預約',
    description: '體驗嚴選乙級中餐料理的極致美味，專屬的試吃饗宴。',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-TW" className={inter.variable}>
            <body className="antialiased min-h-screen bg-black text-white selection:bg-green-500 selection:text-white">
                <main className="relative flex flex-col min-h-screen overflow-hidden">
                    {/* Background Elements */}
                    <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-900/40 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-900/30 rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10 flex-grow">
                        {children}
                    </div>

                    <footer className="relative z-10 py-8 text-center text-sm text-gray-500 glass border-t-0">
                        <p>© 2026 乙級學徒練工坊 | 用心呈現 Traditional Cuisine</p>
                    </footer>
                </main>
            </body>
        </html>
    );
}
