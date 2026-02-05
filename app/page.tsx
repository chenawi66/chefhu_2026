import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import BookingForm from '@/components/BookingForm';
import FloatingCTA from '@/components/FloatingCTA';
import { dishes } from '@/lib/data';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <DishGrid dishes={dishes} />
            <BookingForm />
            <FloatingCTA />

            {/* Decorative Spacer */}
            <div className="py-20 flex justify-center opacity-30">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
        </main>
    );
}
