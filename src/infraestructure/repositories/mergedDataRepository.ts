import { MergedDataModel } from "../../domain/models";
import { MergedDataRepositoryInterface } from "../../domain/repositories";
import { MysqlService } from "../services";


export class MergedDataRepository implements MergedDataRepositoryInterface {

    constructor(private readonly mysqlService: MysqlService) {

    }
    findAll(page: number): Promise<MergedDataModel[]> {
        return this.mysqlService.getAllHistory(page);
    }
    save(data: MergedDataModel[]): void {
        this.mysqlService.insertData(data);
    }


}