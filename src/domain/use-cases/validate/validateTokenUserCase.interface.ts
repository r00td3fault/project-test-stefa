import { APIGatewayAuthorizerResult } from "aws-lambda";
import { validateTokenType } from "../../types/validateToken.type";

export interface validateTokenUseCaseInterface {
    execute(data: validateTokenType): Promise<APIGatewayAuthorizerResult>
}
