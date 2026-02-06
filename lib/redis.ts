import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: process.env.KV_REST_API_URL || '',
    token: process.env.KV_REST_API_TOKEN || '',
})

export const REDIS_KEYS = {
    SLOTS: 'available_slots',
    LOCKED: 'locked_dates',
}
