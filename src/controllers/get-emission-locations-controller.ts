import { Request, Response } from 'express';

import { BaseController } from "./base-controller";

import { redisClient } from '../services';

/**
 * @class GetEmissionLocationsController
 */
export class GetEmissionLocationsController extends BaseController {

    /**
 * @constructor
 */
    constructor() {
        super();
    }

    /**
     * @method executeImpl()
     */
    public async executeImpl(_request: Request, response: Response) {

        console.log(`[${this.constructor.name}] retrieving emission locations data...`);

        await redisClient.connect();

        const responseDto = await redisClient.get('emissionLocationsData');

        console.log(`[${this.constructor.name}] emission locations data retrieved.`);

        return this.ok(response, responseDto);
    }

};