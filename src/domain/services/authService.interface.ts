import { UserEntity } from "../entities/user.entity"
import { loginUserType } from "../types/user.type"

export interface AuthServiceInterface {
    register(data: UserEntity): Promise<void>
    login(data: UserEntity): Promise<loginUserType>
    validate(token: string): Promise<void>
}