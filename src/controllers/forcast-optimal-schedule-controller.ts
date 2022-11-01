import { Request, Response } from 'express';

import { BaseController } from "./base-controller";

// import { wattTimeClient } from '../services';
import { forcast1, forcast2, forcast3 } from '../services/watttime/data';
import { Get24HourEmissionsForcastResponseDTO } from '../services/watttime/interface';

import { Forcast } from '../interface';


/**
 * @class ForcastOptimalScheduleController
 */
export class ForcastOptimalScheduleController extends BaseController {

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

        const balancingAuthorities = request.query.balancingAuthorities as string;

        // await wattTimeClient.login();
        // const forcastResponse = await wattTimeClient.get24hrEmissionsForcast(balancingAuthority);

        const responseDto = await this.generateOptimalSchedule([forcast1, forcast2, forcast3]);

        return this.ok(response, responseDto);
    }

    /**
     * @generateOptimalSchedule
     */
    private async generateOptimalSchedule(forcasts: Get24HourEmissionsForcastResponseDTO[]): Promise<Forcast> {

        const optimalSchedule: Forcast = {
            generatedAt: '',
            forecast: []
        };

        const forcastLength = forcasts[0].forecast.length;

        for (var i = 0; i < forcastLength; i++) {
            var lowest = null;
            for (var j = 0; j < forcasts.length; j++) {
                console.log(`forcasts[${j}].forecast[${i}]: ${forcasts[j].forecast[i].value}:  ${forcasts[j].forecast[i].ba}`)
                if (lowest == null) {
                    lowest = forcasts[j].forecast[i];
                }

                if (lowest.value > forcasts[j].forecast[i].value) {
                    lowest = forcasts[j].forecast[i];
                }
            }
            optimalSchedule.forecast.push({
                time: lowest?.point_time || '',
                value: lowest?.value || -1,
                balanceAutority: lowest?.ba || '',
            });
        };

        return optimalSchedule;
    };

};