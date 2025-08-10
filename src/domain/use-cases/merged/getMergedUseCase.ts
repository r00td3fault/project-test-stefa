import { cachedDataEntity } from "../../entities";
import { CachedDataModel, MergedDataModel } from "../../models";
import { CacheRepositoryInterface, MergedDataRepositoryInterface } from "../../repositories";
import { ExternalServiceInterface } from "../../services/externalService.interface";
import { resultSpeciesApi, resultStartWarsApi, speciesApiType, startWarsApiType } from "../../types";
import { GetMergedDataUseCaseInterface } from "./getMergedUseCase.interface";


export class GetMergedDataUseCase implements GetMergedDataUseCaseInterface {

    constructor(
        private readonly cacheRepository: CacheRepositoryInterface,
        private readonly mergedDataRepository: MergedDataRepositoryInterface,
        private readonly externalService: ExternalServiceInterface
    ) {

    }
    async execute(): Promise<MergedDataModel[]> {

        const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + (30 * 60);

        let startsDataInAPi: startWarsApiType;
        let spiecesDataInApi: speciesApiType;

        const startsDataInCache = await this.cacheRepository.findById('1');

        console.log('startsDataInCache', startsDataInCache)
        const spiecesDataInCache = await this.cacheRepository.findById('2');

        console.log('spiecesDataInCache', spiecesDataInCache)

        let startsDataFormat: cachedDataEntity | null = null;
        let spiecesDataFormat: cachedDataEntity | null = null;


        if (!startsDataInCache) {
            startsDataInAPi = await this.externalService.getStarts();

            console.log('startsDataInAPi', startsDataInAPi)
            startsDataFormat = {
                apiId: '1',
                response: JSON.stringify(startsDataInAPi.results)
            }

            await this.cacheRepository.save(new CachedDataModel(startsDataFormat), expirationTimeInSeconds.toString());
        }

        if (!spiecesDataInCache) {
            spiecesDataInApi = await this.externalService.getSpieces();

            console.log('spiecesDataInApi', spiecesDataInApi)

            spiecesDataFormat = {
                apiId: '2',
                response: JSON.stringify(spiecesDataInApi.results),
            };

            await this.cacheRepository.save(new CachedDataModel(spiecesDataFormat), expirationTimeInSeconds.toString());
        }

        const startsData = startsDataFormat ? startsDataFormat : startsDataInCache;
        const spiecesData = spiecesDataFormat ? spiecesDataFormat : spiecesDataInCache;

        console.log('startsData', startsData);
        console.log('spiecesData', spiecesData);

        /**
         * unified logic
         * yo relaciones las species que tiene el personaje de starwars que viene en este formato
         * species: ["https://swapi.bry.com.br/api/species/2/"]
         * cojo la primera y voy y consulto el nombre de la especie en la otra api y luego uno todo
         * con los datos de starwars mas el nombre de la specie el id y la url
         */

        const dataUnified = JSON.parse(startsData!?.response).map((data: resultStartWarsApi) => {

            data.species = data.species?.length ? data.species : [];

            let formatObject = {
                name: data.name || '',
                height: data.height || 0,
                gender: data.gender || '',
                homeworld: data.homeworld || '',
                speciesName: '',
                speciesId: '',
                speciesUrl: ''
            };

            if (data.species.length > 0) {
                // tomo el id de la specie para buscarlo en la data de la otra api
                const startsSpecie = data.species[0];
                const startsSpecieId = startsSpecie?.slice(2).replace('/', '');
                const startsSpecieData = JSON.parse(spiecesData!?.response).find(
                    (data: resultSpeciesApi) => data.uid === startsSpecieId
                );

                // se agrega la información
                formatObject.speciesId = startsSpecieData?.speciesId || '';
                formatObject.speciesName = startsSpecieData?.speciesName || '';
                formatObject.speciesUrl = startsSpecieData?.speciesUrl || '';
            }

            return formatObject;
        });

        console.log('dataUnified', dataUnified)

        const mergedDataObject: MergedDataModel[] = dataUnified.map(data => new MergedDataModel(data))

        console.log('mergedDataObject', mergedDataObject)

        // save in bd
        this.mergedDataRepository.save(mergedDataObject);

        return mergedDataObject;
    }
}