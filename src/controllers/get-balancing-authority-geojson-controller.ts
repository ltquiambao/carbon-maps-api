import { Request, Response } from 'express';

import { BaseController } from "./base-controller";

import { balancingAuthorityGeoJson } from '../data';

/**
 * @class GetBalancingAuthorityGeoJsonController
 */
export class GetBalancingAuthorityGeoJsonController extends BaseController {

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

        console.log(`[${this.constructor.name}] retrieving geoLocation for balancingAuthority ${balancingAuthority}...`);

        balancingAuthorityGeoJson.features.find((feature) => feature.properties.abbrev == balancingAuthority);

        const responseDto = {
            type: "FeatureCollection",
            features: [balancingAuthorityGeoJson.features.find((feature) => feature.properties.abbrev == balancingAuthority)]
        }

        console.log(`[${this.constructor.name}] emission locations data retrieved.`);

        return this.ok(response, responseDto);
    }

};