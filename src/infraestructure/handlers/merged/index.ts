import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { cacheRepository, externalService, mergedDataRepository } from '../../di';
import { GetMergedDataUseCase } from '../../../domain/use-cases/merged/getMergedUseCase';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {


  try {
    console.log(event);
    const mixedUseCase = new GetMergedDataUseCase(cacheRepository, mergedDataRepository, externalService);
    const response = await mixedUseCase.execute();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data received successfully!', data: response }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Somethin was wrong' }),
    };
  }

};
