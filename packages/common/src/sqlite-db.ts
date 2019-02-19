import { Database } from "sqlite3";
import { IDb, IQueryResult } from "./types";

class SQLiteDb implements IDb {
  private db: Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }

  public query(text: string, params: any[]): Promise<IQueryResult> {
    return new Promise((resolve, reject) => {
      this.db.all(text, params, (err, rows) => {
        if (err) {
          return reject(err);
        }

        return resolve({ rows });
      });
    });
  }
}

export default SQLiteDb;
