import pino, { Logger } from "pino";
import { Service } from "typedi";

@Service()
export class LoggingService {
  private _logger: Logger;

  constructor() {
    this._logger = pino({
      level: process.env.NODE_ENV === "production" ? "warn" : "debug",
      ...(process.env.NODE_ENV !== "production" && {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          },
        },
      }),
    });
  }

  get logger(): Logger {
    return this._logger;
  }

  info(message: string, ...args: unknown[]): void {
    this._logger.info(message);
  }

  debug(message: string, ...args: unknown[]): void {
    this._logger.debug(message);
  }

  warn(message: string, ...args: unknown[]): void {
    this._logger.warn(message);
  }

  error(message: string, ...args: unknown[]): void {
    this._logger.error(message);
  }
}
