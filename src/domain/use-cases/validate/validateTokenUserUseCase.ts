import { APIGatewayAuthorizerResult } from "aws-lambda";
import { JwtAdapter } from "../../../infraestructure/adapters/jwtAdapter";
import { validateTokenType } from "../../types/validateToken.type";
import { validateTokenUseCaseInterface } from "./validateTokenUserCase.interface";



export class ValidateTokenUserUseCase implements validateTokenUseCaseInterface {

    constructor() {

    }
    async execute(data: validateTokenType): Promise<APIGatewayAuthorizerResult> {

        const decoded = await JwtAdapter.validateToken<{ sub: string }>(data.jwtToken);
        if (!decoded) throw new Error("Unauthorized: Invalid token");

        return {
            principalId: decoded.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: data.methodArn,
                    },
                ],
            },
        }

    }
}