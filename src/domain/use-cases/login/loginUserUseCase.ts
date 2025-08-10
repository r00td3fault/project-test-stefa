import { BcryptAdapter } from "../../../infraestructure/adapters/bcryptAdapter";
import { JwtAdapter } from "../../../infraestructure/adapters/jwtAdapter";
import { UserEntity } from "../../entities/user.entity";
import { UserModel } from "../../models/user.model";
import { UserRepositoryInterface } from "../../repositories/userRepository.interface";
import { loginUserType } from "../../types/user.type";
import { LoginUseCaseInterface } from "./loginUserCase.interface";



export class LoginUserUseCase implements LoginUseCaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
    ) {

    }
    async execute(data: UserEntity): Promise<loginUserType | null> {

        const userData: UserModel[] | null = await this.userRepository.findUser(data);
        if (!userData?.length) throw new Error("Credentials error, try again");

        const user = userData[0];

        const isPassValid = await BcryptAdapter.compareHash(data.password, user.password);
        if (!isPassValid) throw new Error("Credentials error, try again");

        const payload = {
            email: data.email,
            sub: user.id,
        }

        // generte token
        const token = await JwtAdapter.generateToken(payload);
        if (!token) throw new Error("Error with token");

        return { token };
    }
}