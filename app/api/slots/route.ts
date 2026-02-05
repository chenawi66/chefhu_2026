import { NextResponse } from 'next/server';
import { getDB } from '@/lib/data';

export async function GET() {
    const db = getDB();
    // Filter out slots that might be fully booked if we had logic for that
    return NextResponse.json(db.availableSlots);
}
