import restify from "restify";
import { AccountRoutes } from "./routes/account.routes";
import { TranasctionRoutes } from "./routes/tranasction.routes";
import { AccountService } from "./service/account-service";
import logger from "./utils/logger";

export async function createServer() {
  const server = restify.createServer({});

  server.pre((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  server.use(restify.plugins.jsonBodyParser());

  const accountService = new AccountService();

  await new TranasctionRoutes(accountService).registerRoutes(server);
  await new AccountRoutes(accountService).registerRoutes(server);

  return server;
}
