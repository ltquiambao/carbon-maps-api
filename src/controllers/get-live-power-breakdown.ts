import { Request, Response } from 'express';

import { BaseController } from "./base-controller";

import { electricityMapClient, redisClient } from '../services';

interface PowerBreakdown {
    distribution: {
        powerType: string,
        value: number,
        category: string;
    }[],
    fossilFreePercentage: number,
    renewablePercentage: number,
};

/**
 * @class GetLivePowerBreakdownController
 */
export class GetLivePowerBreakdownController extends BaseController {

    /**
 * @constructor
 */
    constructor() {
        super();
    }

    /**
     * @method executeImpl()
     */
    public async executeImpl(request: Request, response: Response) {

        const latitude = request.query.latitude as string;
        const longitude = request.query.longitude as string;

        console.log(`[${this.constructor.name}] retrieving power breakdown of long, lat[${latitude},${longitude}]...`);

        await redisClient.connect();

        try {
            const cachedResponseDto = await redisClient.get(`powerBreakdown:${latitude},${longitude}`);
            console.log(`[${this.constructor.name}] cache hit power breakdown of long, lat[${latitude},${longitude}].`);
            return this.ok(response, cachedResponseDto);
        } catch (error) {
            console.error(error);
            console.log(`[${this.constructor.name}] cache miss for power breakdown of long, lat[${latitude},${longitude}]`);
        }

        const powerBreakdownResponse = await electricityMapClient.getPowerBreakdown(latitude, longitude);

        const powerConsumptionBreakdown = [];
        const powerProductionBreakdown = [];

        for (const [key, value] of Object.entries(powerBreakdownResponse.powerConsumptionBreakdown)) {
            powerConsumptionBreakdown.push({
                powerType: key,
                value: value ?? 0,
                category: 'consumption'
            });
        };

        for (const [key, value] of Object.entries(powerBreakdownResponse.powerProductionBreakdown)) {
            powerProductionBreakdown.push({
                powerType: key,
                value: value ?? 0,
                category: 'production'
            });
        };

        const responseDto: PowerBreakdown = {
            distribution: [
                ...powerConsumptionBreakdown,
                ...powerProductionBreakdown,
            ],
            fossilFreePercentage: powerBreakdownResponse.fossilFreePercentage,
            renewablePercentage: powerBreakdownResponse.renewablePercentage,
        }

        // cache results
        await redisClient.set(`powerBreakdown:${latitude},${longitude}`, responseDto);

        console.log(`[${this.constructor.name}] retrieved power breakdown of long, lat[${latitude},${longitude}].`);

        return this.ok(response, responseDto);
    }

};