import bcrypt from 'bcryptjs';


export class BcryptAdapter {

    static async genSalt(rounds: number = 10) {
        return bcrypt.genSalt(rounds);

    }

    static async hashPass(password: string, salt) {
        return bcrypt.hash(password, salt)
    }

    static async compareHash(password: string, crypted: string): Promise<boolean> {
        return bcrypt.compare(password, crypted)
    }
}