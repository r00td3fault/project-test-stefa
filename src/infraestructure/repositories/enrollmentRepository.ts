import { EnrollmentInfoSimpleModel } from "../../domain/models";
import { EnrollmentSimpleRepositoryInterface } from "../../domain/repositories";
import { MysqlService } from "../services";

export class EnrollmentRepository implements EnrollmentSimpleRepositoryInterface {

    constructor(private readonly mysqlService: MysqlService) {

    }
    findAll(page: number): Promise<EnrollmentInfoSimpleModel> {
        throw new Error("Method not implemented.");
    }
    save(data: EnrollmentInfoSimpleModel): Promise<void> {
        return this.mysqlService.insertEnrollment(data);
    }

}