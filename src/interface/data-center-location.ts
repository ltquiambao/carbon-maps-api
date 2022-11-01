/**
 * @interface DataCenterLocation
 */
export interface DataCenterLocation {
    name: string,
    data_center: string,
    data_center_operator: string,
    building_id: number,
    building_address: string,
    building_city_state_postal: string,
    latitude: string,
    longitude: string,
    metro_area: string,
    country: string,
    slug?: string,
    [key: string]: any,
}

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