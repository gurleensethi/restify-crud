import { Transaction } from "../types";
import { getDbData, saveDbData } from "../utils/db-utils";
import uuid from "uuid";

export class AccountService {
  async getAllTransactions(): Promise<Transaction[]> {
    const dbData = await getDbData();
    return dbData.transactions;
  }

  async addNewTranasction(data: Omit<Transaction, "id">): Promise<Transaction> {
    const newTranasction: Transaction = {
      id: uuid.v4(),
      ...data,
    };
    const dbData = await getDbData();

    dbData.transactions.push(newTranasction);
    await saveDbData(dbData);

    return newTranasction;
  }

  async getCurrentBalance(): Promise<number> {
    const dbData = await getDbData();
    return dbData.transactions.reduce((prev, curr) => {
      if (curr.type === "credit") {
        return prev + curr.amount;
      }
      return prev - curr.amount;
    }, 0);
  }

  async deleteTranasction(id: string): Promise<Transaction | null> {
    const dbData = await getDbData();

    const index = dbData.transactions.findIndex(
      (tranasction) => tranasction.id === id
    );

    if (index === -1) {
      return null;
    }

    const transction = dbData.transactions[index];

    dbData.transactions.splice(index, 1);
    await saveDbData(dbData);

    return transction;
  }
}
