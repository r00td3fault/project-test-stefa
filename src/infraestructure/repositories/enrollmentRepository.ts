import { EnrollmentInfoSimpleModel } from "../../domain/models/enrollmentSimple.model";
import { EnrollmentSimpleRepositoryInterface } from "../../domain/repositories/enrollmentSimpleRepository.interface";
import { MysqlService } from "../services/mysqlService";

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