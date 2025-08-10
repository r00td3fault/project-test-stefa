import { CacheRepositoryInterface } from "../../domain/repositories";
import DynamoDBService from "../services/dynamoService";


export class CacheRepository implements CacheRepositoryInterface {

    constructor(private readonly dynamoService: DynamoDBService) {

    }
    findById(id: string): Promise<any> {
        return this.dynamoService.getItem(id);
    }
    save(data, ttl: string): void {
        this.dynamoService.createItem(data, ttl);
    }

}