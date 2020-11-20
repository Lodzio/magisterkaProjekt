import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class Repository {
  abstract createLog(value: number): Promise<LogClass>;
}
