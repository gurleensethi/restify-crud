import restify from "restify";

export interface Transaction {
  id: string;
  type: "debit" | "credit";
  amount: number;
  time: number;
  comments?: string;
}

export interface DbData {
  transactions: Transaction[];
}

export interface Routes {
  registerRoutes(server: restify.Server): Promise<void>;
}
