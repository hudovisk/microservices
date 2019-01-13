import { Db } from "@app/common";
import express from "express";
import OAuth2Server from "oauth2-server";

import UserModel from "./user";

const db = new Db();
const model = new UserModel(db);

const oauth = new OAuth2Server({
  model
});

const app = express();
const port = 3000;

// Post token.
app.post('/oauth/token', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  return oauth.token(request, response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
