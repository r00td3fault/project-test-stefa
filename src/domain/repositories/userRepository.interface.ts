import { UserEntity } from "../entities";
import { UserModel } from "../models";



export interface UserRepositoryInterface {
    findUser(data: UserEntity): Promise<UserModel[] | null>;
    save(data: UserEntity): Promise<void>;
}
