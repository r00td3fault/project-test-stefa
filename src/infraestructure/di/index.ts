import {
    CacheRepository,
    EnrollmentRepository,
    MergedDataRepository,
    UserRepository
} from "../repositories";
import { ExternalService, MysqlService } from "../services";
import DynamoDBService from "../services/dynamoService";


const table = "startWarsCache";


const mysqlService = new MysqlService()
export const cacheRepository = new CacheRepository(new DynamoDBService(table))
export const externalService = new ExternalService()

export const mergedDataRepository = new MergedDataRepository(mysqlService);
export const enrollmentRepository = new EnrollmentRepository(mysqlService);
export const userRepository = new UserRepository(mysqlService);