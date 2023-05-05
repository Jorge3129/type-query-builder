import { Pool, PoolClient } from "pg";
import { DriverAdapter, QueryResult } from "../driver";

export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class PostgresDriver implements DriverAdapter {
  private pool: Pool;
  private client: PoolClient;

  public async connect(config: PostgresConfig): Promise<void> {
    this.pool = new Pool(config);
    this.client = await this.pool.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.release();
    await this.pool.end();
  }

  public async query<T>(
    query: string,
    params: any[] = []
  ): Promise<QueryResult<T>> {
    try {
      const result = await this.client.query(query, params);

      return { rows: result.rows, rowCount: result.rowCount };
    } catch (error) {
      throw error;
    }
  }
}
