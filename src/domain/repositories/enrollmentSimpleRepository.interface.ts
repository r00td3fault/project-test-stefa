import { EnrollmentInfoSimpleModel } from "../models/enrollmentSimple.model";


export interface EnrollmentSimpleRepositoryInterface {
    findAll(page: number): Promise<EnrollmentInfoSimpleModel>;
    save(data: EnrollmentInfoSimpleModel): Promise<void>;
}
