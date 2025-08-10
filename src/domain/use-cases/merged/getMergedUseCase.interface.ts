import { MergedDataModel } from "../../models/mergedData.model";

export interface GetMergedDataUseCaseInterface {
    execute(): Promise<MergedDataModel[]>
}
