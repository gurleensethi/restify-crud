import path from "path";
import fs from "fs/promises";
import logger from "./logger";

const DEFAULT_DATA = {
  transactions: [],
};

export default async function resolveDb(): Promise<void> {
  logger.info("Looking for db/db.json...");

  const dbPath = path.resolve(require.main!.filename, "..", "..");

  // Check of db folder exists
  let dbFolderExists = false;

  try {
    const dbFolder = await fs.stat(path.join(dbPath, "db"));
    dbFolderExists = dbFolder.isDirectory();
  } catch (err) {
    dbFolderExists = false;
  }

  if (!dbFolderExists) {
    logger.info("'db' folder not found in root, creating...");
    await fs.mkdir(path.join(dbPath, "db"));
  } else {
    logger.info("'db' folder found in root.");
  }

  // Check if db.json file exists inside db folder.
  let dbFileExists = false;
  const dbFilePath = path.join(dbPath, "db", "db.json");

  try {
    const dbFile = await fs.stat(dbFilePath);
    dbFileExists = dbFile.isFile();
  } catch (err) {
    dbFileExists = false;
  }

  if (!dbFileExists) {
    logger.info("'db/db.json' file not found, creating...");
    await fs.writeFile(dbFilePath, Buffer.from(JSON.stringify(DEFAULT_DATA)));
  } else {
    logger.info("'db/db.json' file found.");
  }
}
