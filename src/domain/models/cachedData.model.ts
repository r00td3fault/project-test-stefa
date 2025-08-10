import { cachedDataEntity } from "../entities";


export class CachedDataModel implements cachedDataEntity {
    apiId: string;
    response: string;
    created: Date;

    constructor(data: cachedDataEntity) {
        this.apiId = data.apiId
        this.response = data.response;
        this.created = new Date()
    }

}