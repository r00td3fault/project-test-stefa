import { UserEntity } from "../entities"
import { loginUserType } from "../types"


export interface AuthServiceInterface {
    register(data: UserEntity): Promise<void>
    login(data: UserEntity): Promise<loginUserType>
    validate(token: string): Promise<void>
}