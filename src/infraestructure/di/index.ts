import { CacheRepository } from "../repositories/cacheRepository"
import { MysqlService } from "../services/mysqlService"
import { ExternalService } from "../services/externalServices"
import { MergedDataRepository } from "../repositories/mergedDataRepository"
import { EnrollmentRepository } from "../repositories/enrollmentRepository"
import DynamoDBService from "../services/dynamoService"
import { UserRepository } from "../repositories/userRepository"

const table = "startWarsCache";


const mysqlService = new MysqlService()
export const cacheRepository = new CacheRepository(new DynamoDBService(table))
export const externalService = new ExternalService()

export const mergedDataRepository = new MergedDataRepository(mysqlService);
export const enrollmentRepository = new EnrollmentRepository(mysqlService);
export const userRepository = new UserRepository(mysqlService);