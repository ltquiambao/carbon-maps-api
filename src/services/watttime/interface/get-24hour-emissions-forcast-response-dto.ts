/**
 * @Get24HourEmissionsForcastResponseDTO
 */
export interface Get24HourEmissionsForcastResponseDTO {
    generated_at: string,
    forecast: {
        point_time: string,
        ba: string,
        value: number,
        version: string
    }[]
};