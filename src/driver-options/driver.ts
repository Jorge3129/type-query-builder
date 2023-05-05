export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface DriverAdapter {
  connect(config: object): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(query: string, params: any[]): Promise<QueryResult<T>>;
}
