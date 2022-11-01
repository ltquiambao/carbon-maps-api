import { Request, Response } from 'express';

import { locations } from '../data';
import { EmissionsLocationMapper } from '../mapper';
import { wattTimeClient, redisClient } from '../services';

import { BaseController } from "./base-controller";

/**
 * @class RefreshEmissionLocationsDataController
 */
export class RefreshEmissionLocationsDataController extends BaseController {

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

        console.log(`[${this.constructor.name}] refreshsing emission locations data.`);

        await wattTimeClient.login();
        await redisClient.connect();

        const emissionLocationMapper = new EmissionsLocationMapper();
        const emissionLocations = locations.map(location => emissionLocationMapper.to(location));

        await Promise.all(emissionLocations.map(async (emissionLocation) => {
            const responseDto = await wattTimeClient.getRealTimeEmissions(emissionLocation.latitude, emissionLocation.longitude);

            const {
                ba,
                freq,
                percent,
                moer,
                point_time
            } = responseDto;

            emissionLocation.emissionsData = {
                balancingAuthority: ba,
                lastUpdateSeconds: freq,
                percent,
                moer,
                cO2eqgkWh: moer * (453.592 / 1000), // -> convert moer to g/kWh
                pointTime: point_time
            };

        }));

        emissionLocations.sort((el1, el2) => el1.emissionsData!.cO2eqgkWh - el2.emissionsData!.cO2eqgkWh)

        console.log(`[${this.constructor.name}] refreshed [${emissionLocations.length}] locations.`)

        await redisClient.set('emissionLocationsData', emissionLocations);

        console.log(`[${this.constructor.name}] cache updated.`);

        console.log(`[${this.constructor.name}] emissions data refreshed.`);

        return this.created(response);
    }
};