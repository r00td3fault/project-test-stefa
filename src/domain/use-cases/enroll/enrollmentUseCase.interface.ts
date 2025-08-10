import { EnrollmentInfoSimpleModel } from "../../models";


export interface enrollmentSimpleUseCaseInterface {
    execute(data: EnrollmentInfoSimpleModel): Promise<void>
}
