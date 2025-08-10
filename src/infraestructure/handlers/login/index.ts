import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { LoginUserUseCase } from '../../../domain/use-cases/login/loginUserUseCase';
import { userRepository } from '../../di';
import { userSchema } from '../../../utils/validations/enrollmentBody.schema';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Request body is missing.' }),
        };
    }

    const requestBody = JSON.parse(event.body);

    const { value, error } = userSchema.validate(requestBody);

    if (error) {
        return {
            statusCode: 409,
            body: JSON.stringify({ message: error.details.map(detail => detail.message) }),
        };
    }

    try {

        const loginUseCase = new LoginUserUseCase(userRepository);
        const data = await loginUseCase.execute(requestBody);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login success!', data }),
        };
    } catch (error) {
        console.error('POST /auth/login - ', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: error.message }),
        };
    }

};
