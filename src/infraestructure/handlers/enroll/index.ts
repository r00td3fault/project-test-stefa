import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { enrollmentSchema } from "../../../utils/validations/enrollmentBody.schema";
import { enrollmentRepository } from "../../di";
import { EnrollmentUseCase } from "../../../domain/use-cases/enroll/enrollmentUseCase";



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Request body is missing.' }),
        };
    }

    const requestBody = JSON.parse(event.body);

    const { value, error } = enrollmentSchema.validate(requestBody);
    if (error) {
        return {
            statusCode: 409,
            body: JSON.stringify({ message: error.details.map(detail => detail.message) }),
        };
    }

    try {

        const enrollmentUseCase = new EnrollmentUseCase(enrollmentRepository);
        const data = await enrollmentUseCase.execute(requestBody);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Enrollment created successfully!', requestBody }),
        };

    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON in request body.' }),
        };
    }
};
