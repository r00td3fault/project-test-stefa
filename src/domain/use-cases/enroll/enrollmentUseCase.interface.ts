import { EnrollmentInfoSimpleModel } from "../../models/enrollmentSimple.model";

export interface enrollmentSimpleUseCaseInterface {
    execute( data: EnrollmentInfoSimpleModel): Promise<void>
}
