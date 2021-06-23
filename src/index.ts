import { createServer } from "./server";
import logger from "./utils/logger";
import resolveDb from "./utils/resolve-db";

(async () => {
  await resolveDb();
  const server = await createServer();

  server.listen(8080, () => {
    logger.info(`${server.name} listening on ${server.url}`);
  });
})();
