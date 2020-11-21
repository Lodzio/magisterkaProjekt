import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class Repository {
  abstract createLog(value: number, id: string): Promise<LogClass>;
  abstract getLogs(id: string): Promise<LogClass[]>;
}
