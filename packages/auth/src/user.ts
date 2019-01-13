import { IDb } from "@app/common";
import Oauth2Server from "oauth2-server";

export default class User implements Oauth2Server.PasswordModel {
  private db: IDb;

  constructor(db: IDb) {
    this.db = db;
  }

  public async getUser(username: string, password: string): Promise<Oauth2Server.User | null> {
    const result = await this.db.query("SELECT id FROM users WHERE username = $1 AND password = $2", [
      username,
      password
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  public async getClient(clientId: string, clientSecret: string): Promise<Oauth2Server.Client | null> {
    const result = await this.db.query(
      "SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $1 AND client_secret = $2",
      [clientId, clientSecret]
    );

    const oAuthClient = result.rows[0];

    if (!oAuthClient) {
      return null;
    }

    return {
      id: oAuthClient.client_id,
      grants: ["password"]
    };
  }

  public async saveToken(
    token: Oauth2Server.Token,
    client: Oauth2Server.Client,
    user: Oauth2Server.User
  ): Promise<Oauth2Server.Token | null> {
    const result = await this.db.query(
      "INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id) VALUES ($1, $2, $3, $4)",
      [
        token.accessToken,
        token.accessTokenExpiresOn,
        client.id,
        token.refreshToken,
        token.refreshTokenExpiresOn,
        user.id
      ]
    );

    return result.rows.length ? result.rows[0] : null; // TODO return object with client: {id: clientId} and user: {id: userId} defined
  }

  public async getAccessToken(accessToken: string): Promise<Oauth2Server.Token | null> {
    const result = await this.db.query(
      "SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = $1",
      [accessToken]
    );

    const token = result.rows[0];

    return {
      accessToken: token.access_token,
      client: { id: token.client_id, grants: ["password"] },
      expires: token.expires,
      user: { id: token.userId } // could be any object
    };
  }

  public verifyScope(token: Oauth2Server.Token, scope: string | string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
