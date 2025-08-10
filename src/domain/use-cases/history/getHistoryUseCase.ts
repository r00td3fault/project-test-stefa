import { MergedDataEntity } from "../../entities/mergedData.entity";
import { MergedDataRepositoryInterface } from "../../repositories/merdedDataRepository.interface";
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