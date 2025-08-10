import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { userSchema } from '../../../utils/validations/enrollmentBody.schema';
import { RegisterUserUseCase } from '../../../domain/use-cases/register/registerUserUseCase';
import { userRepository } from '../../di';



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

        const registerUseCase = new RegisterUserUseCase(userRepository);
        const data = await registerUseCase.execute(requestBody);


        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully!' }),
        };
    } catch (error) {
        console.log('POST /auth/register - ', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Somethin was wrong' }),
        };
    }

};
