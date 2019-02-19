import { Pool } from "pg";
import { IDb, IQueryResult } from "./types";

class PgDb implements IDb {
  private pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  public query (text: string, params: any[]): Promise<IQueryResult> {
    let position = 1;
    const query = text.replace(/\?/g, () => `$${position++}`);
    return this.pool.query(query, params);
  }
}

export default PgDb;
