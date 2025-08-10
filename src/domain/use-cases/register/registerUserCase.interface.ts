import { UserModel } from "../../models";


export interface RegisterUseCaseInterface {
    execute(data: UserModel): Promise<void>
}
