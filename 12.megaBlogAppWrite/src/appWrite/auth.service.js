import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        // appwrite with handle error
        return userAccount;
      }
    } catch (error) {
      console.error(`Error creating account: ${error.message}`);
      if (error.cause) {
        console.error(
          `Appwrite service:: createAccount :: ${error.cause.message}`
        );
      }
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error(`Error logging in account: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite service:: login :: ${error.cause.message}`);
      }
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(`Error getting current user: ${error.message}`);
      if (error.cause) {
        console.error(
          `Appwrite service:: getCurrentUser :: ${error.cause.message}`
        );
      }
      throw error;
    }
  }

  async logout() {
    try {
      /* 
        * To delete single current session
        await this.account.deleteSession("current");
        */
      await this.account.deleteSessions();
    } catch (error) {
      console.error(`Error logging out account: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite service:: logout :: ${error.cause.message}`);
      }
    }
  }
}

const authService = new AuthService();

export default authService;
