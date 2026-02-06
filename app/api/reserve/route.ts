import { NextResponse } from 'next/server';
import { getDB, saveDB, Reservation } from '@/lib/data';
import { sendEmailNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, guests, relationship } = body;

    // Validation
    if (!name || !phone || !date || !time || !relationship) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validation: 4-6 guests
    if (guests < 4 || guests > 6) {
      return NextResponse.json({ error: 'Group size must be between 4 and 6 people' }, { status: 400 });
    }

    const db = getDB();

    // Check if slot exists
    const slotExists = db.availableSlots.some(s => s.date === date && s.times.includes(time));
    if (!slotExists) {
      return NextResponse.json({ error: 'Invalid time slot' }, { status: 400 });
    }

    // Create Reservation
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      date,
      time,
      guests,
      relationship,
      confirmed: false,
      createdAt: new Date().toISOString()
    };

    db.reservations.push(newReservation);
    saveDB(db);

    // Auto-manage: Remove the slot so it can't be booked again
    const { removeSlot } = await import('@/lib/data');
    removeSlot(date, time);

    // Send Email Notification instead of Line
    await sendEmailNotification(newReservation);

    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
