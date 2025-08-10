import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../models/user.model";


export interface UserRepositoryInterface {
    findUser(data: UserEntity): Promise<UserModel[] | null>;
    save(data: UserEntity): Promise<void>;
}
