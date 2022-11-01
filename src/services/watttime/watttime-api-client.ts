import axios, { AxiosStatic } from 'axios';

import { WattTimeApiClientConfigurations } from "./watttime-api-configurations";
import { Get24HourEmissionsForcastResponseDTO, GetRealTimeEmissionsResponseDTO } from "./interface";

/**
 * @class WattTimeApiClient
 */
export class WattTimeApiClient {

    private restClient: AxiosStatic;
    private url: string;

    /**
     * @constructor
     */
    constructor(
        private readonly configurations: WattTimeApiClientConfigurations
    ) {
        this.url = configurations.url;
        this.restClient = axios;
    }

    /**
     * @method login()
     */
    public async login(): Promise<void> {
        console.log(`[WattTimeApiClient] logging in...`);
        const { userName, password, url } = this.configurations;
        const loginUrl = `${url}/login`;
        const authHeaders = { username: userName, password };
        const response = await this.restClient.get(loginUrl, { auth: authHeaders });
        const authToken = response.data.token;
        this.configurations.authToken = authToken;
        console.log(`[WattTimeApiClient] logged in succesful.`);
    }

    /**
     * @getRealTimeEmissions()
     */
    public async getRealTimeEmissions(latitude: string, longitude: string): Promise<GetRealTimeEmissionsResponseDTO> {
        try {

            const { url, authToken } = this.configurations;

            const config = {
                headers: { Authorization: `Bearer ${authToken}` },
                params: {
                    style: "all",
                    latitude,
                    longitude
                }
            };
            const realTimeEmissionsUrl = `${url}/index`;
            const response = await this.restClient.get(realTimeEmissionsUrl, config);
            const data = response.data as GetRealTimeEmissionsResponseDTO;
            return data;
        } catch (error) {
            console.error(`[WattTimeApiClient] error fetching data.`, error);
            return {
                ba: 'no balancing authority available w/ coordinates.',
                freq: '',
                percent: '',
                moer: -1,
                point_time: ''
            };
        }
    };

    public async get24hrEmissionsForcast(balancingAuthority: string): Promise<Get24HourEmissionsForcastResponseDTO> {
        try {
            const { url, authToken } = this.configurations;

            const config = {
                headers: { Authorization: `Bearer ${authToken}` },
                params: {
                    ba: balancingAuthority,
                }
            };

            const forcastUrl = `${url}/forecast`;
            const response = await this.restClient.get(forcastUrl, config);
            const data = response.data as Get24HourEmissionsForcastResponseDTO;

            return data;

        } catch (error) {
            console.error(`[WattTimeApiClient] error fetching data.`, error);
            throw error;
        }

    }

};