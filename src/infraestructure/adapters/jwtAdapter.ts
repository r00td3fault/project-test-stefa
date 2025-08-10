import jwt from 'jsonwebtoken';

const JWT_SEED = String(process.env.JWT_SECRET);


export class JwtAdapter {

    static generateToken(payload: any, duration = 60 * 60): Promise<string | null> {

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token ?? '');
            })
        })

    }

    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (error, decoded) => {
                if (error) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}