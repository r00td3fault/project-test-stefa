import { UserEntity } from "../../domain/entities";
import { UserModel } from "../../domain/models";
import { UserRepositoryInterface } from "../../domain/repositories";
import { MysqlService } from "../services";


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