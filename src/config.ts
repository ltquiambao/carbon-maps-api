import dotenv from 'dotenv';

dotenv.config();

export const config = {
    api: {
        port: process.env.PORT || 8080,
        name: process.env.SERVER_NAME || "carbon-maps-api"
    },
    electricityMaps: {
        apiKey: process.env.ELECTRICITY_MAPS_API_KEY!,
        url: process.env.ELECTRICITY_MAPS_URL!
    },
    redis: {
        url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME_AND_PORT}`
    },
    wattTimeApi: {
        userName: process.env.WATTTIME_USERNAME!,
        password: process.env.WATTTIME_PASSWORD!,
        url: "https://api2.watttime.org/v2"
    },
};