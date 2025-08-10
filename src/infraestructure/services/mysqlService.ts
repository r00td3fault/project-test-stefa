import { UserEntity } from "../../domain/entities/user.entity";
import { EnrollmentInfoSimpleModel } from "../../domain/models/enrollmentSimple.model";
import { MergedDataModel } from "../../domain/models/mergedData.model";
import { UserModel } from "../../domain/models/user.model";
import { db } from "../../utils/db";


export class MysqlService {
    constructor() { }


    async getAllHistory(pageNumber: number): Promise<any> {
        let connection;
        try {
            connection = await db.getPool().getConnection();
            //TODO: recibir como parametro
            const table = "merged_data";
            const pageSize = 5;
            const offset = (pageNumber - 1) * pageSize;
            const [rows] = await connection.execute(`
                SELECT * FROM 
                    ${table} 
                    ORDER BY created DESC 
                    LIMIT ? OFFSET ?`,
                [String(pageSize), String(offset)]
            );
            console.log(rows);
            return rows;

        } catch (error) {
            console.error('Error fetching historial:', error);
        } finally {
            if (connection) {
                connection.release();
            }
        }

    }

    async insertData(data: MergedDataModel[]): Promise<void> {
        let connection;
        try {
            connection = await db.getPool().getConnection();

            const table = 'merged_data';
            const columns = ['id', 'name', 'height', 'gender', 'homeworld', 'speciesName', 'speciesId', 'speciesUrl', 'created'];

            const dataToInsert = data.map(data => {
                return [
                    data.id,
                    data.name,
                    data.height,
                    data.homeworld,
                    data.speciesName,
                    data.speciesId,
                    data.speciesUrl,
                    data.created
                ]
            });

            const placeholders = dataToInsert.map(() => `(?)`).join(', ');

            const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders}`;

            const flattenedData = dataToInsert.flat();

            const [rows] = await connection.execute(sql, flattenedData);

            console.log('Inserted rows:', rows);

        } catch (error) {
            console.error('Error inserting data api rows', error);
            throw new Error("Somethig was wrong with api rows")
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    async insertEnrollment(data: EnrollmentInfoSimpleModel): Promise<void> {
        let connection;
        try {
            connection = await db.getPool().getConnection();
            const table = 'enrrolment_info_simple';

            const columns = '(id, name, lastName, age, gender, monthlyIncome, interest)';

            const sql = `INSERT INTO ${table} ${columns} VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [data.id, data.name, data.lastName, data.age, data.gender, data.monthlyIncome, data.interest];

            await connection.execute(sql, values);


        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error("Somethig was wrong");
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    async registerUser(data: UserModel): Promise<void> {
        let connection;
        try {
            connection = await db.getPool().getConnection();
            const table = 'user';

            const columns = '(id, email, password, created )';

            const sql = `INSERT INTO ${table} ${columns} VALUES (?, ?, ?, ?)`;

            const values = [data.id, data.email, data.password, data.created];

            await connection.execute(sql, values);


        } catch (error) {
            console.error('Error Register users:', error);
            throw new Error("Somethig was wrong");
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    async findUser(data: UserEntity): Promise<UserModel[] | null> {
        let connection;
        try {
            connection = await db.getPool().getConnection();
            const table = "user";
            const [rows] = await connection.execute(`
                SELECT * FROM ${table} WHERE email = ? `,
                [data.email]
            );

            return rows ? rows as UserModel[] : null;

        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

}