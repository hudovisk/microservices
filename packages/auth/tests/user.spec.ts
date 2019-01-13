import { IDb } from "@app/common";
import User from "./user";

import "mocha";
import sinon from "sinon";

const queryFake = sinon.stub();
const fakeDB: IDb = {
  query: queryFake
};

describe("User Model", () => {
  let user: User;
  beforeEach(() => {
    user = new User(fakeDB);
  });

  describe("getUser", () => {
    it("should return first user", async () => {
      const firstUser = { username: "first", pwd: "secret" };
      const users = [{}, {}];
      queryFake.returns(users);
      const result = user.getUser("", "");
      sinon.assert.calledWith(querySpy, "foo", []);
    });
  });
});
