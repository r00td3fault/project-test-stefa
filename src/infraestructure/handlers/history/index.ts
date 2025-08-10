import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { GetHistoryUseCase } from '../../../domain/use-cases/history/getHistoryUseCase';
import { mergedDataRepository } from '../../di';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
        const page = event.queryStringParameters?.page ? parseInt(event.queryStringParameters?.page) : 1;
        const hitorialUsecase = new GetHistoryUseCase(mergedDataRepository);
        const data = await hitorialUsecase.execute(page);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'OK', data }),
        };
  } catch (error) {
      console.log('GET /historial - ', error);
      return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Somethin was wrong' }),
      };
  }

};
