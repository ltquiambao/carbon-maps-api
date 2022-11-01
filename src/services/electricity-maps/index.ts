import { config } from '../../config';

import { ElectricityMapsClient } from "./electricity-maps-client";

const electricityMapClient = new ElectricityMapsClient(config.electricityMaps);

export { electricityMapClient };