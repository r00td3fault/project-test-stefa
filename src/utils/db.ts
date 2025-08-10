import mysql, { Pool, PoolOptions } from 'mysql2/promise';

class MysqlDatabase {
  private static instance: MysqlDatabase;
  private pool: Pool;

  private constructor() {
    // Configure your MySQL connection pool options
    const poolOptions: PoolOptions = {
      host: process.env.DB_HOST || 'localhost',
      user: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_NAME),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    this.pool = mysql.createPool(poolOptions);
  }

  public static getInstance(): MysqlDatabase {
    if (!MysqlDatabase.instance) {
      MysqlDatabase.instance = new MysqlDatabase();
    }
    return MysqlDatabase.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export const db = MysqlDatabase.getInstance();