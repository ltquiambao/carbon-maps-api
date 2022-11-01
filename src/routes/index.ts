import express, { Request, Response } from 'express';

import {
    forcastOptimalScheduleController,
    getBalancingAuthorityGeoJsonController,
    getEmissionLocationsController,
    get24hourEmissionsForcastController,
    refreshEmissionLocationsDataController,
    getLivePowerBreakdownController,
} from '../controllers';

const router = express.Router();

const healthController = (_req: Request, res: Response) => res.status(200).json({ message: 'service healthy.' });

router.get('/', healthController);
router.get('/health', healthController);

router.get('/index', getEmissionLocationsController.execute);
router.get('/geojson', getBalancingAuthorityGeoJsonController.execute);
router.get('/forcast', get24hourEmissionsForcastController.execute);
router.get('/power-breakdown', getLivePowerBreakdownController.execute);
router.post('/optimal-schedule', forcastOptimalScheduleController.execute);
router.post('/index', refreshEmissionLocationsDataController.execute);

export { router };


