import { Server } from "restify";
import { AccountService } from "../service/account-service";
import { Routes } from "../types";

export class AccountRoutes implements Routes {
  constructor(private accountService: AccountService) {}

  async registerRoutes(server: Server): Promise<void> {
    server.get("/account/current-balance", async (req, res) => {
      const balance = await this.accountService.getCurrentBalance();

      res.json({ balance });
    });
  }
}
