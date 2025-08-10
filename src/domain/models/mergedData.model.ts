import UUIDv4Adapter from "../../infraestructure/adapters/uuidAdapter";
import { MergedDataEntity } from "../entities";

export class MergedDataModel implements MergedDataEntity {
    id: string;
    name: string;
    height: number;
    gender: string;
    homeworld: string;
    speciesName?: string;
    speciesId?: string;
    speciesUrl?: string;
    created: Date;

    constructor(data: MergedDataEntity) {
        this.id = UUIDv4Adapter.getInstance().generate(),
            this.name = data.name;
        this.height = data.height;
        this.gender = data.gender;
        this.homeworld = data.homeworld;
        this.speciesName = data.speciesName;
        this.speciesId = data.speciesId;
        this.speciesUrl = data.speciesUrl;
        this.created = new Date();
    }

    public getResume() {
        return `${this.name} is ${this.gender} has ${this.height} and is from ${this.homeworld} `;
    }

}