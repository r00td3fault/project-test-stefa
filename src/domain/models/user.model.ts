import UUIDv4Adapter from "../../infraestructure/adapters/uuidAdapter";
import { UserEntity } from "../entities/user.entity";

export class UserModel implements UserEntity {
    id: string;
    email: string;
    password: string;
    created: Date;

    constructor(data: UserEntity) {
        this.id = UUIDv4Adapter.getInstance().generate();
        this.email = data.email;
        this.password = data.password;
        this.created = new Date();
    }

}