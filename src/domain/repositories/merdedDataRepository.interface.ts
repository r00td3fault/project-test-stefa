import { MergedDataModel } from "../models/mergedData.model";


export interface MergedDataRepositoryInterface {
    findAll( page: number ): Promise<MergedDataModel[]>;
    save( data: MergedDataModel[]): void;
}
