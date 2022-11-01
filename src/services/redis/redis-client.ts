import { createClient, RedisClientType } from 'redis';

import { config } from '../../config';

/**
 * @class RedisClient
 */
export class RedisClient {

    private readonly client: RedisClientType;

    /**
     * @constructor
     */
    constructor() {
        this.client = createClient(config.redis);
    };

    /**
     * @method connect()
     */
    public async connect() {
        console.log(`[redisClient] connecting to redis cache...`);
        if (this.client.isOpen) {
            return;
        }
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect();
        console.log(`[redisClient] connected to redis cache succesful.`);
    }

    /**
     * @method set()
     */
    public async set(key: any, value: any, ttl: number = 60 * 60 * 24) {
        const stringifiedValue = JSON.stringify(value);
        console.log(`[redisClient] setting ttlInSeconds:[${ttl}] for key:[${key}] to redis cache...`);
        await this.client.setEx(key, ttl, stringifiedValue);
        console.log(`[redisClient] key:[${key}] set succesful.`);
    }

    /**
     * @metod get()
     */
    public async get(key: any): Promise<any> {
        console.log(`[redisClient] get:key[${key}]...`);
        const value = await this.client.get(key);
        console.log(`[redisClient] get:key[${key}] succesful.`);

        if (value == null) {
            throw new Error(`[redisClient] parsing error whilst get(key) key: ${key}`);
        }

        const parsedValue = JSON.parse(value);
        return parsedValue;
    };

};