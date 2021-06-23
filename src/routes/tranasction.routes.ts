import { Server } from "restify";
import errors from "restify-errors";
import { AccountService } from "../service/account-service";
import { Routes, Transaction } from "../types";

export class TranasctionRoutes implements Routes {
  constructor(private accountService: AccountService) {}

  private validateTranasctionData(
    transaction: Partial<Transaction>
  ): Error | null {
    const { amount, type, comments } = transaction;

    if (!amount || !type) {
      return new errors.BadRequestError(`Amount and Type required in body.`);
    }

    if (typeof amount !== "number") {
      return new errors.BadRequestError(`Amount should be number`);
    }

    if (!(type === "credit" || type === "debit")) {
      return new errors.BadRequestError(
        `Type should be either credit or debit.`
      );
    }

    if (comments && typeof comments !== "string") {
      return new errors.BadRequestError(`Comments should be of type string!`);
    }

    return null;
  }

  async registerRoutes(server: Server): Promise<void> {
    server.get("/transactions", async (req, res) => {
      const tranasctions = await this.accountService.getAllTransactions();
      res.json({ tranasctions });
    });

    server.post("/transactions", async (req, res, next) => {
      if (!req.body) {
        return next(new errors.BadRequestError(`Body Required!`));
      }

      const { type, amount, comments } = req.body;

      const error = this.validateTranasctionData({ type, amount, comments });

      if (error) {
        return next(error);
      }

      const newTransaction = await this.accountService.addNewTranasction({
        type,
        amount,
        time: Date.now(),
      });

      res.json(newTransaction);
    });

    server.del("/transactions/:id", async (req, res, next) => {
      const { id }: { id: string } = req.params;

      const deletedTranasction = await this.accountService.deleteTranasction(
        id
      );

      if (!deletedTranasction) {
        return next(
          new errors.NotFoundError(`Tranasction with id ${id} not found`)
        );
      }

      res.json(deletedTranasction);
    });
  }
}
