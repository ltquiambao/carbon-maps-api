import { DataCenterLocation, EmissionLocation } from "../interface"

/**
 * @class EmissionsLocationMapper
 */
export class EmissionsLocationMapper {

    public to(dataCenterLocation: DataCenterLocation): EmissionLocation {
        const {
            name,
            data_center,
            data_center_operator,
            building_address,
            building_id,
            building_city_state_postal,
            latitude,
            longitude,
            metro_area,
            country
        } = dataCenterLocation;

        return {
            cloudProvider: name,
            dataCenterName: data_center,
            dataCenterOperator: data_center_operator,
            buildingId: `${building_id}`,
            buildingAddress: building_address,
            buildingCityStatePostal: building_city_state_postal,
            latitude: latitude,
            longitude: longitude,
            metroArea: metro_area,
            country: country,
            emissionsData: undefined
        };
    }
};

/**    
 * {
    "name": "Google Cloud",
    "data_center": "Lumen Buenos Aires",
    "data_center_operator": "Lumen",
    "building_id": 15099,
    "building_address": "Avenue del Campo 1301",
    "building_city_state_postal": "Buenos Aires, Argentina, C1427 APA",
    "latitude": "-34.5904043",
    "longitude": "-58.4671098",
    "metro_area": "Buenos Aires",
    "country": "Argentina"
    }
 */