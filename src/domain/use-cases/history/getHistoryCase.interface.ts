import { MergedDataEntity } from "../../entities";


export interface GetHistoryUseCaseInterface {
    execute(page: number): Promise<MergedDataEntity[] | null>
}
