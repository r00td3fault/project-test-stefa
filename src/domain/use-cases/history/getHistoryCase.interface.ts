import { MergedDataEntity } from "../../entities/mergedData.entity";

export interface GetHistoryUseCaseInterface {
    execute( page: number): Promise<MergedDataEntity[] | null >
}
