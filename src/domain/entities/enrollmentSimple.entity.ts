export interface EnrollmentInfoSimpleEntity {
    name: string;
    lastName: string;
	age: number;
    gender: genderEnum;
    monthlyIncome: number;
	interest: enrollmentProductsEnum;
}

export enum genderEnum {
	MALE='MALE',
	FEMALE='FEMALE',
	OTHER='OTHER'
}

export enum enrollmentProductsEnum {
    LIFE = 'LIFE',
    INVESTMENT = 'INVESTMENT',
    HEALTH = 'HEALTH',
	VEHICLE = 'VEHICLE',
	TRAVEL = 'TRAVEL',
	SOAT = 'SOAT',
}