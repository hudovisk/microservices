import { Pool } from "pg";
import { IDb } from "./types";

const pool = new Pool();

class Db implements IDb {
  public query (text: string, params: any[]) {
    return pool.query(text, params);
  }
}

export default Db;
