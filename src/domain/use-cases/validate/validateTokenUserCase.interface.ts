import { APIGatewayAuthorizerResult } from "aws-lambda";
import { validateTokenType } from "../../types";


export interface validateTokenUseCaseInterface {
    execute(data: validateTokenType): Promise<APIGatewayAuthorizerResult>
}
