import { GetBalancingAuthorityGeoJsonController } from './get-balancing-authority-geojson-controller';
import { GetEmissionLocationsController } from './get-emission-locations-controller';
import { Get24hourEmissionsForcastController } from './get-24hour-emissions-forcast-controller';
import { GetLivePowerBreakdownController } from './get-live-power-breakdown';
import { RefreshEmissionLocationsDataController } from './refresh-emission-locations-data-controller';
import { ForcastOptimalScheduleController } from './forcast-optimal-schedule-controller';

const forcastOptimalScheduleController = new ForcastOptimalScheduleController();
const getBalancingAuthorityGeoJsonController = new GetBalancingAuthorityGeoJsonController();
const getEmissionLocationsController = new GetEmissionLocationsController();
const get24hourEmissionsForcastController = new Get24hourEmissionsForcastController();
const getLivePowerBreakdownController = new GetLivePowerBreakdownController();
const refreshEmissionLocationsDataController = new RefreshEmissionLocationsDataController();

export {
    forcastOptimalScheduleController,
    getBalancingAuthorityGeoJsonController,
    getEmissionLocationsController,
    get24hourEmissionsForcastController,
    getLivePowerBreakdownController,
    refreshEmissionLocationsDataController
};