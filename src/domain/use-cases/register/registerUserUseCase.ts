import { BcryptAdapter } from "../../../infraestructure/adapters";
import { UserEntity } from "../../entities";
import { UserModel } from "../../models";
import { UserRepositoryInterface } from "../../repositories";
import { RegisterUseCaseInterface } from "./registerUserCase.interface";



export class RegisterUserUseCase implements RegisterUseCaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
    ) {

    }
    async execute(data: UserModel): Promise<void> {

        const userData: UserModel[] | null = await this.userRepository.findUser(data);

        if (userData?.length) {
            throw new Error("Users already exists");
        }

        const salt = await BcryptAdapter.genSalt();
        const cryptedPass = await BcryptAdapter.hashPass(data.password, salt);

        const registerUser: UserEntity = {
            email: data.email,
            password: cryptedPass
        }

        const newUser = new UserModel(registerUser);
        this.userRepository.save(newUser);
    }
}