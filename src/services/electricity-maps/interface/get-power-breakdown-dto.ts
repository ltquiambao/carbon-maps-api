/**
 * @interface GetPowerBreakDownResponseDTO
 */
export interface GetPowerBreakDownResponseDTO {
    zone: string;
    datetime: string;
    updatedAt: string;
    createdAt: string;
    powerConsumptionBreakdown: {
        "nuclear": number | null | undefined;
        "geothermal": number | null | undefined;
        "biomass": number | null | undefined;
        "coal": number | null | undefined;
        "wind": number | null | undefined;
        "solar": number | null | undefined;
        "hydro": number | null | undefined;
        "gas": number | null | undefined;
        "oil": number | null | undefined;
        "unknown": number | null | undefined;
        "hydro discharge": number | null | undefined;
        "battery discharge": number | null | undefined;
    };
    powerProductionBreakdown: {
        "nuclear": number | null | undefined;
        "geothermal": number | null | undefined;
        "biomass": number | null | undefined;
        "coal": number | null | undefined;
        "wind": number | null | undefined;
        "solar": number | null | undefined;
        "hydro": number | null | undefined;
        "gas": number | null | undefined;
        "oil": number | null | undefined;
        "unknown": number | null | undefined;
        "hydro discharge": number | null | undefined;
        "battery discharge": number | null | undefined;
    };
    powerImportBreakdown: { [key: string]: any };
    powerExportBreakdown: { [key: string]: any };
    fossilFreePercentage: number;
    renewablePercentage: number;
    powerConsumptionTotal: number;
    powerProductionTotal: number;
    powerImportTotal: number | null | undefined;
    powerExportTotal: number | null | undefined;
    isEstimated: boolean,
    estimationMethod: number | null | undefined;
};

/**
 * {
    "zone": "CA-ON",
    "datetime": "2022-10-17T17:00:00.000Z",
    "updatedAt": "2022-10-17T16:50:57.729Z",
    "createdAt": "2022-10-14T18:01:25.747Z",
    "powerConsumptionBreakdown": {
        "nuclear": 5830,
        "geothermal": 0,
        "biomass": 3,
        "coal": 0,
        "wind": 2964,
        "solar": 58,
        "hydro": 4066,
        "gas": 2169,
        "oil": 0,
        "unknown": 0,
        "hydro discharge": 0,
        "battery discharge": 0
    },
    "powerProductionBreakdown": {
        "nuclear": 5830,
        "geothermal": null,
        "biomass": 3,
        "coal": null,
        "wind": 2964,
        "solar": 58,
        "hydro": 4066,
        "gas": 2169,
        "oil": null,
        "unknown": null,
        "hydro discharge": null,
        "battery discharge": null
    },
    "powerImportBreakdown": {},
    "powerExportBreakdown": {},
    "fossilFreePercentage": 86,
    "renewablePercentage": 47,
    "powerConsumptionTotal": 15090,
    "powerProductionTotal": 15090,
    "powerImportTotal": null,
    "powerExportTotal": null,
    "isEstimated": false,
    "estimationMethod": null
}
 */