export interface IQueryResult {
  rows: any[];
}

export interface IDb {
  query (text: string, params: any[]): Promise<IQueryResult>
}
