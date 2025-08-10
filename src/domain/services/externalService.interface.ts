import { speciesApiType } from "../types/spiecesApi.type";
import { startWarsApiType } from "../types/startWarsApi.type"


export interface ExternalServiceInterface {
    getStarts( ): Promise< startWarsApiType>;
    getSpieces( ): Promise< speciesApiType>;
}
