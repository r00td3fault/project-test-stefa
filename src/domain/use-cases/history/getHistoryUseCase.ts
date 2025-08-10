import { MergedDataEntity } from "../../entities";
import { MergedDataRepositoryInterface } from "../../repositories";
import { GetHistoryUseCaseInterface } from "./getHistoryCase.interface";



export class GetHistoryUseCase implements GetHistoryUseCaseInterface {

    constructor(
        private readonly mergedDataRepository: MergedDataRepositoryInterface,
    ) {

    }
    async execute(pageNumber: number): Promise<MergedDataEntity[]> {
        return this.mergedDataRepository.findAll(pageNumber);
    }
}