export function generateredis() {
  `import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});`;
}

export function cacheservice() {
  `
import { redis } from "./redis.client.js";

export async function setCache(
    key: string,
    value: unknown,
    ttl = 60
) {
    await redis.set(
        key,
        JSON.stringify(value),
        "EX",
        ttl
    );
}

export async function getCache<T>(
    key: string
): Promise<T | null> {
    const value = await redis.get(key);

    return value
        ? JSON.parse(value)
        : null;
}

export async function deleteCache(
    key: string
) {
    await redis.del(key);
}
`;
}

export function redisqueue() {}

export function redisworker() {}
