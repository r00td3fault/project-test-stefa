import { MergedDataModel } from "../../domain/models/mergedData.model";
import { MergedDataRepositoryInterface } from "../../domain/repositories/merdedDataRepository.interface";
import { MysqlService } from "../services/mysqlService";

export class MergedDataRepository implements MergedDataRepositoryInterface {

    constructor( private readonly mysqlService : MysqlService) {

    }
    findAll(page: number): Promise<MergedDataModel[]> {
        return this.mysqlService.getAllHistory(page);
    }
    save(data: MergedDataModel[]): void {
        this.mysqlService.insertData(data);
    }


}