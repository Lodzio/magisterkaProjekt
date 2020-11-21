import { Repository } from "./repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SQLiteRepository extends Repository {
  async createLog(value, id) {
    const timestamp = new Date().getTime();
    const log: LogClass = { value, timestamp, id };
    return log;
  }

  async getLogs(id) {
    return [];
  }
}
