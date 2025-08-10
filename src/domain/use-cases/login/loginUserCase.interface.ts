import { UserModel } from "../../models";
import { loginUserType } from "../../types";


export interface LoginUseCaseInterface {
    execute(data: UserModel): Promise<loginUserType | null>
}
