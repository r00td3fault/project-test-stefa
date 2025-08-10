import { UserModel } from "../../models/user.model";
import { UserEntity } from "../../entities/user.entity";

export interface RegisterUseCaseInterface {
    execute(data: UserModel): Promise<void>
}
