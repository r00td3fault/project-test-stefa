import { CachedDataModel } from "../models";


export interface CacheRepositoryInterface {
    findById(id: string): Promise<CachedDataModel | null>;
    save(data: CachedDataModel, ttl: string): void;
}
