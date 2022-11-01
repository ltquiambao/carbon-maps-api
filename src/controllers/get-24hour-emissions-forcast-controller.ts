import { Request, Response } from 'express';

import { BaseController } from "./base-controller";

import { wattTimeClient, redisClient } from '../services';

/**
 * @class Get24hourEmissionsForcastController
 */
export class Get24hourEmissionsForcastController extends BaseController {

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

        const balancingAuthority = request.query.balancingAuthority as string;

        console.log(`[${this.constructor.name}] retrieving 24 hour emission location forcast for balancingAuthority ${balancingAuthority}...`);

        await redisClient.connect();

        try {
            const cachedResponseDto = await redisClient.get(`24hrforcast:${balancingAuthority}`);
            console.log(`[${this.constructor.name}] cache hit retrieved 24 hour emission location forcast for balancingAuthority [${balancingAuthority}]`);
            return this.ok(response, cachedResponseDto);
        } catch (error) {
            console.error(error);
            console.log(`[${this.constructor.name}] cache miss for 24 hour emission location forcast for balancingAuthority [${balancingAuthority}]`);
        }

        await wattTimeClient.login();
        const forcastResponse = await wattTimeClient.get24hrEmissionsForcast(balancingAuthority);

        const responseDto = forcastResponse.forecast.map(interval => {
            return {
                time: interval.point_time,
                value: interval.value * (453.592 / 1000), // -> convert moer to g/kWh
            }
        });

        // cache results
        const cachettl = 60 * 5; // 5 mins
        await redisClient.set(`24hrforcast:${balancingAuthority}`, responseDto, cachettl);

        console.log(`[${this.constructor.name}] retrieved 24 hour emission location forcast for balancingAuthority ${balancingAuthority}`);

        return this.ok(response, responseDto);
    }

};