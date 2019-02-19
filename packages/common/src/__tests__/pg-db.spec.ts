import pg from "pg";
import sinon from "sinon";
import PgDb from "../pg-db";

const fakeQuery = sinon.fake();

// @ts-ignore
pg.Pool = class {
  public query = fakeQuery;
};

describe("PgDb", () => {
  it("should map ? parameters to $<position>", async () => {
    const username = "test";
    const password = "password";

    const db = new PgDb();
    db.query("SELECT id FROM users WHERE username = ? AND password = ?", [username, password]);
    sinon.assert.calledWithExactly(fakeQuery, "SELECT id FROM users WHERE username = $1 AND password = $2", [
      username,
      password
    ]);
  });
});
