import { NextResponse } from 'next/server';
import { redis, REDIS_KEYS } from '@/lib/redis';
import { getDB } from '@/lib/data';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password, action, date, time } = body;

        // Simple security check
        if (password !== process.env.DASHBOARD_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let slots: any[] = await redis.get(REDIS_KEYS.SLOTS) || [];

        if (slots.length === 0) {
            slots = getDB().availableSlots;
        }

        if (action === 'open') {
            // Add or ensure slot exists
            const existingSlotIndex = slots.findIndex(s => s.date === date);
            if (existingSlotIndex > -1) {
                if (!slots[existingSlotIndex].times.includes(time)) {
                    slots[existingSlotIndex].times.push(time);
                }
            } else {
                slots.push({ date, times: [time] });
            }
            // Sort by date
            slots.sort((a, b) => a.date.localeCompare(b.date));
        } else if (action === 'close') {
            // Remove slot
            slots = slots.map(slot => {
                if (slot.date === date) {
                    return {
                        ...slot,
                        times: slot.times.filter((t: string) => t !== time)
                    };
                }
                return slot;
            }).filter(slot => slot.times.length > 0);
        } else if (action === 'reset') {
            // Reset to default saturdays
            slots = getDB().availableSlots;
        }

        await redis.set(REDIS_KEYS.SLOTS, slots);
        return NextResponse.json({ success: true, slots });
    } catch (error) {
        console.error('Manage Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
