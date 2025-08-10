import { MergedDataModel } from "../../models";

export interface GetMergedDataUseCaseInterface {
    execute(): Promise<MergedDataModel[]>
}
