import { UserModel } from "../../models/user.model";
import { loginUserType } from "../../types/user.type";

export interface LoginUseCaseInterface {
    execute(data: UserModel): Promise<loginUserType | null>
}
