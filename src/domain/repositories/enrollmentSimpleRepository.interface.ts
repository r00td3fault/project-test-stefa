import { EnrollmentInfoSimpleModel } from "../models";



export interface EnrollmentSimpleRepositoryInterface {
    findAll(page: number): Promise<EnrollmentInfoSimpleModel>;
    save(data: EnrollmentInfoSimpleModel): Promise<void>;
}
