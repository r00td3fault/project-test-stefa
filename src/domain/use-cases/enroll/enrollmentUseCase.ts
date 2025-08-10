import { EnrollmentInfoSimpleModel } from "../../models/enrollmentSimple.model";
import { EnrollmentSimpleRepositoryInterface } from "../../repositories/enrollmentSimpleRepository.interface";
import { enrollmentSimpleUseCaseInterface } from "./enrollmentUseCase.interface";



export class EnrollmentUseCase implements enrollmentSimpleUseCaseInterface {

    constructor(
        private readonly enrollmentRepository: EnrollmentSimpleRepositoryInterface,
    ) {

    }
    execute(data: EnrollmentInfoSimpleModel): Promise<void> {

        const enrollmentObject = new EnrollmentInfoSimpleModel(data);
        return this.enrollmentRepository.save(enrollmentObject);
    }

}