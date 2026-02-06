import fs from 'fs';
import path from 'path';

const DB_PATH = process.env.NODE_ENV === 'production'
    ? '/tmp/local-db.json'
    : path.join(process.cwd(), 'local-db.json');

export interface TimeSlot {
    date: string;
    times: string[];
}

export interface Reservation {
    id: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    relationship: string;
    confirmed: boolean;
    createdAt: string;
}

export interface DB {
    availableSlots: TimeSlot[];
    reservations: Reservation[];
}

// Helper to generate Saturdays between two dates
function generateSaturdays(startMonth: number, startYear: number, endMonth: number, endYear: number) {
    const dates = [];
    const excludedDates = ['2026-03-28', '2026-04-04', '2026-05-23', '2026-05-30', '2026-06-06'];
    const start = new Date(startYear, startMonth - 1, 1);
    const end = new Date(endYear, endMonth, 0);

    let current = new Date(start);
    while (current <= end) {
        if (current.getDay() === 6) { // 6 = Saturday
            const dateStr = current.toISOString().split('T')[0];
            if (!excludedDates.includes(dateStr)) {
                dates.push(dateStr);
            }
        }
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

export function getDB(): DB {
    if (!fs.existsSync(DB_PATH)) {
        const saturdays = generateSaturdays(3, 2026, 6, 2026);
        const initialDB: DB = {
            availableSlots: saturdays.map(date => ({
                date,
                times: ["18:00"]
            })),
            reservations: []
        };
        saveDB(initialDB);
        return initialDB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export function saveDB(db: DB) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function removeSlot(date: string, time: string) {
    const db = getDB();
    db.availableSlots = db.availableSlots.map(slot => {
        if (slot.date === date) {
            return {
                ...slot,
                times: slot.times.filter(t => t !== time)
            };
        }
        return slot;
    }).filter(slot => slot.times.length > 0);
    saveDB(db);
}

// End of DB logic

