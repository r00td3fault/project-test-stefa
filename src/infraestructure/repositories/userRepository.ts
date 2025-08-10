import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../../domain/models/user.model";
import { UserRepositoryInterface } from "../../domain/repositories/userRepository.interface";
import { MysqlService } from "../services/mysqlService";

export class UserRepository implements UserRepositoryInterface {

    constructor(private readonly mysqlService: MysqlService) {

    }
    findUser(data: UserEntity): Promise<UserModel[] | null> {
        return this.mysqlService.findUser(data);
    }
    save(data: UserModel): Promise<void> {
        return this.mysqlService.registerUser(data);
    }

}