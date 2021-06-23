import fs from "fs/promises";
import path from "path";
import { DbData } from "../types";

function getDbFilePath() {
  return path.resolve(require.main!.filename, "..", "..", "db", "db.json");
}

export async function getDbData(): Promise<DbData> {
  const dbFilePath = getDbFilePath();
  const data = await fs.readFile(dbFilePath);
  return JSON.parse(data.toString());
}

export async function saveDbData(dbData: DbData): Promise<void> {
  const dbFilePath = getDbFilePath();
  await fs.writeFile(dbFilePath, JSON.stringify(dbData));
}
