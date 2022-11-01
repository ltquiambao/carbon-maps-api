/**
 * @interface EmissionLocation
 */
export interface EmissionLocation {
    cloudProvider: string
    dataCenterName: string
    dataCenterOperator: string
    buildingId: string
    buildingAddress: string
    buildingCityStatePostal: string
    latitude: string
    longitude: string
    metroArea: string
    country: string
    emissionsData?: {
        balancingAuthority: string,
        lastUpdateSeconds: string,
        percent: string,
        moer: number
        cO2eqgkWh: number,
        pointTime: string
    }
};