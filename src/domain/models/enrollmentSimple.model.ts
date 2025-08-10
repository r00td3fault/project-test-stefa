import UUIDv4Adapter from '../../infraestructure/adapters/uuidAdapter';
import { EnrollmentInfoSimpleEntity, enrollmentProductsEnum, genderEnum } from '../entities';

const profiles = {
    1000: 'clasic',
    3000: 'asociate',
    5000: 'preference'
}

export class EnrollmentInfoSimpleModel implements EnrollmentInfoSimpleEntity {
    id: string;
    name: string;
    lastName: string;
    age: number;
    gender: genderEnum;
    monthlyIncome: number;
    interest: enrollmentProductsEnum;
    created: Date;

    constructor(data: EnrollmentInfoSimpleEntity) {
        this.id = UUIDv4Adapter.getInstance().generate();
        this.name = data.name;
        this.lastName = data.lastName;
        this.age = data.age;
        this.gender = data.gender;
        this.monthlyIncome = data.monthlyIncome;
        this.interest = data.interest;
        this.created = new Date();
    }

    getFullname() {
        return `${this.name} ${this.lastName}`;
    }

    isOld() {
        return this.age >= 18;
    }

    getProfile() {
        const profile = this.monthlyIncome <= 1000 ? profiles[1000] :
            this.monthlyIncome > 1000 && this.monthlyIncome <= 3000 ? profiles[3000] : profiles[5000];

        return profile;
    }


}