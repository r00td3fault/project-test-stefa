import { speciesApiType, startWarsApiType } from "../types";




export interface ExternalServiceInterface {
    getStarts(): Promise<startWarsApiType>;
    getSpieces(): Promise<speciesApiType>;
}
