import { ExternalServiceInterface } from "../../domain/services/externalService.interface";

import https from 'https'
import fetch from 'node-fetch';
import { speciesApiType } from "../../domain/types/spiecesApi.type";
import { startWarsApiType } from "../../domain/types/startWarsApi.type";

import { RateLimit } from 'async-sema';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const limit = RateLimit(5); //5 request per second


export class ExternalService implements ExternalServiceInterface {

    constructor() {

    }
    async getStarts(): Promise<startWarsApiType> {

        await limit();

        try {
            const response = await fetch('https://swapi.bry.com.br/api/people/?format=json&page=1&limit=100', { agent: httpsAgent });
            console.log('response', response);
            const data = await response.json();
            return data as startWarsApiType;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error("Error fetchin Api1")
        }
    }
    async getSpieces(): Promise<speciesApiType> {

        await limit();

        try {
            const response = await fetch('https://www.swapi.tech/api/species?page=1&limit=100', { agent: httpsAgent });
            console.log('response', response);
            const data = await response.json();
            return data as speciesApiType;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error("Error fetchin Api2")
        }
    }



}