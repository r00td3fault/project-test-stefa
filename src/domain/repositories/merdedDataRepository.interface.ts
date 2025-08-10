import { MergedDataModel } from "../models";


export interface MergedDataRepositoryInterface {
    findAll(page: number): Promise<MergedDataModel[]>;
    save(data: MergedDataModel[]): void;
}
