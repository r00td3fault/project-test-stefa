export type validateTokenType = {
    jwtToken: string,
    methodArn: string
}


export type authorizerType = {
    principalId: string,
    policyDocument: {
        Version: string,
        Statement: [
            {
                Action: string,
                Effect: string,
                Resource: string,
            },
        ],
    },
}