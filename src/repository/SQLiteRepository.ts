import { Repository } from "./repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SQLiteRepository extends Repository {
  async createLog(value) {
    const timestamp = new Date().getTime();
    return { value, timestamp };
  }
}
