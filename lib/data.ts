import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'local-db.json');

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
    const start = new Date(startYear, startMonth - 1, 1);
    const end = new Date(endYear, endMonth, 0);

    let current = new Date(start);
    while (current <= end) {
        if (current.getDay() === 6) { // 6 = Saturday
            dates.push(current.toISOString().split('T')[0]);
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

export interface Dish {
    id: string;
    name: string;
    category: string;
    series: string;
}

export const dishes: Dish[] = [
    // 201 Series
    { id: "201A-1", name: "蒸牛肉丸", category: "葷食", series: "201A" },
    { id: "201A-2", name: "煙燻黃魚", category: "葷食", series: "201A" },
    { id: "201A-3", name: "五柳魷魚", category: "葷食", series: "201A" },
    { id: "201A-4", name: "白果燴芥菜", category: "葷食", series: "201A" },
    { id: "201A-5", name: "糖醋佛手黃瓜", category: "葷食", series: "201A" },
    { id: "201A-6", name: "掛霜腰果", category: "葷食", series: "201A" },
    { id: "201A-7", name: "炸韭菜春捲", category: "葷食", series: "201A" },

    { id: "201B-1", name: "酸菜炒牛肉絲", category: "葷食", series: "201B" },
    { id: "201B-2", name: "松鼠黃魚", category: "葷食", series: "201B" },
    { id: "201B-3", name: "白果炒魷魚", category: "葷食", series: "201B" },
    { id: "201B-4", name: "金銀蛋扒芥菜", category: "葷食", series: "201B" },
    { id: "201B-5", name: "涼拌佛手黃瓜", category: "葷食", series: "201B" },
    { id: "201B-6", name: "掛霜腰果", category: "葷食", series: "201B" },
    { id: "201B-7", name: "炸肉絲春捲", category: "葷食", series: "201B" },

    { id: "201C-1", name: "炒牛肉鬆", category: "葷食", series: "201C" },
    { id: "201C-2", name: "拆燴黃魚羹", category: "葷食", series: "201C" },
    { id: "201C-3", name: "椒鹽魷魚", category: "葷食", series: "201C" },
    { id: "201C-4", name: "金菇扒芥菜", category: "葷食", series: "201C" },
    { id: "201C-5", name: "麻辣佛手黃瓜", category: "葷食", series: "201C" },
    { id: "201C-6", name: "掛霜腰果", category: "葷食", series: "201C" },
    { id: "201C-7", name: "炸牡蠣春捲", category: "葷食", series: "201C" },

    // 202 Series
    { id: "202A-1", name: "香酥排骨", category: "葷食", series: "202A" },
    { id: "202A-2", name: "蒜泥蒸魚", category: "葷食", series: "202A" },
    { id: "202A-3", name: "三鮮燴魷魚", category: "葷食", series: "202A" },
    { id: "202A-4", name: "鮮菇扒芥菜", category: "葷食", series: "202A" },
    { id: "202A-5", name: "甘味鮮筍", category: "葷食", series: "202A" },
    { id: "202A-6", name: "蜜汁腰果", category: "葷食", series: "202A" },
    { id: "202A-7", name: "炸芝麻春捲", category: "葷食", series: "202A" },

    // 203 Series
    { id: "203D-1", name: "乾炸豬肉丸", category: "葷食", series: "203D" },
    { id: "203D-2", name: "鱸魚羹", category: "葷食", series: "203D" },
    { id: "203D-3", name: "百花釀雞腿", category: "葷食", series: "203D" },
    { id: "203D-4", name: "蘋果蝦鬆", category: "葷食", series: "203D" },
    { id: "203D-5", name: "鮑菇燒白菜", category: "葷食", series: "203D" },
    { id: "203D-6", name: "蜊肉燴芥菜", category: "葷食", series: "203D" },
    { id: "203D-7", name: "紅心芋泥", category: "葷食", series: "203D" },

    { id: "203E-1", name: "煎豬肉餅", category: "葷食", series: "203E" },
    { id: "203E-2", name: "麒麟蒸魚", category: "葷食", series: "203E" },
    { id: "203E-3", name: "八寶封雞腿", category: "葷食", series: "203E" },
    { id: "203E-4", name: "果律蝦球", category: "葷食", series: "203E" },
    { id: "203E-5", name: "碧綠雙味菇", category: "葷食", series: "203E" },
    { id: "203E-6", name: "芥菜鹹蛋湯", category: "葷食", series: "203E" },
    { id: "203E-7", name: "豆沙芋棗", category: "葷食", series: "203E" },
];
