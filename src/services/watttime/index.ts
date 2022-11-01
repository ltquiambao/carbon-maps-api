import { WattTimeApiClient } from "./watttime-api-client";

import { config } from '../../config';

export const wattTimeClient = new WattTimeApiClient(config.wattTimeApi);