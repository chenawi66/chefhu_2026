import { NextResponse } from 'next/server';
import { getDB } from '@/lib/data';
import { redis, REDIS_KEYS } from '@/lib/redis';

export async function GET() {
    try {
        // Try to get from Redis
        const cachedSlots = await redis.get(REDIS_KEYS.SLOTS);

        if (cachedSlots) {
            return NextResponse.json(cachedSlots);
        }

        // If not in Redis, get from local DB and seed Redis
        const db = getDB();
        await redis.set(REDIS_KEYS.SLOTS, db.availableSlots);

        return NextResponse.json(db.availableSlots);
    } catch (error) {
        console.error('Redis error:', error);
        // Fallback to local DB on error
        const db = getDB();
        return NextResponse.json(db.availableSlots);
    }
}
