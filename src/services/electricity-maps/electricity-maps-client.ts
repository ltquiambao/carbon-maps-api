import axios, { AxiosStatic } from 'axios';

import { ElectricityMapsClientConfigurations } from './electricty-maps-client-configurations';
import { GetPowerBreakDownResponseDTO } from './interface';

/**
 * @class ElectricityMapsClient
 */
export class ElectricityMapsClient {

    private restClient: AxiosStatic;
    private url: string;
    private xblobrkeyHeader: string;

    /**
     * @constructor
     */
    constructor(
        private readonly configurations: ElectricityMapsClientConfigurations
    ) {
        this.restClient = axios;
        this.url = configurations.url;
        this.xblobrkeyHeader = this.configurations.apiKey
    }

    /**
     * @method getPowerBreakdown()
     */
    public async getPowerBreakdown(latitude: string, longitude: string) {
        try {

            const config = {
                headers: { "X-BLOBR-KEY": this.xblobrkeyHeader },
                params: {
                    lon: longitude,
                    lat: latitude
                }
            };
            const forcastUrl = `${this.url}/power-breakdown/latest`;
            const response = await this.restClient.get(forcastUrl, config);
            const data = response.data as GetPowerBreakDownResponseDTO;

            return data;
        } catch (error) {
            console.error(`[ElectricityMapsClient] error retrieving live power breakdown.`, error);
            throw error;
        }

    }

};

