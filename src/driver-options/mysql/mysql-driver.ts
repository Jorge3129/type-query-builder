import { createPool, Pool, PoolConnection } from "mysql2/promise";
import { DriverAdapter, QueryResult } from "../driver";

interface MysqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class MysqlDriver implements DriverAdapter {
  private pool: Pool;
  private connection: PoolConnection;

  public async connect(config: MysqlConfig): Promise<void> {
    this.pool = createPool(config);
    this.connection = await this.pool.getConnection();
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      this.connection.release();
    }
    if (this.pool) {
      await this.pool.end();
    }
  }

  public async query<T>(
    query: string,
    params: any[] = []
  ): Promise<QueryResult<T>> {
    try {
      const [rows, _] = await this.connection.query(query, params);
      return { rows: rows as T[], rowCount: (rows as T[]).length };
    } catch (error) {
      throw error;
    }
  }
}
