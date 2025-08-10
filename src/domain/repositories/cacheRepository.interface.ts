import { CachedDataModel } from "../models/cachedData.model";

export interface CacheRepositoryInterface {
    findById( id: string ): Promise< CachedDataModel | null>;
    save( data: CachedDataModel, ttl: string): void;
}
