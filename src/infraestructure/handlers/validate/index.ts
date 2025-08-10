import { APIGatewayAuthorizerResult } from "aws-lambda";
import { validateTokenType } from "../../../domain/types";
import { ValidateTokenUserUseCase } from "../../../domain/use-cases/validate/validateTokenUserUseCase";


export const handler = async (event): Promise<APIGatewayAuthorizerResult> => {

    const token = event?.headers['Authorization'];
    const methodArn = event.routeArn;


    if (!token || !token.startsWith('Bearer ')) throw new Error('Unauthorized: Missing or invalid token format');

    const jwtToken = token.split(' ')[1];

    const authData: validateTokenType = {
        jwtToken,
        methodArn
    }

    try {

        const loginUseCase = new ValidateTokenUserUseCase();
        const data = await loginUseCase.execute(authData);

        return data;

    } catch (error) {
        console.error('GET /auth/validate - ', error);
        return {
            principalId: 'anonymous',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: methodArn,
                    },
                ],
            },
        };
    }

};
