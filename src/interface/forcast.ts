/**
 *  @interface Forcast
 */
export interface Forcast {
    generatedAt: string,
    forecast: {
        time: string,
        value: number,
        balanceAutority: string,
    }[]
};