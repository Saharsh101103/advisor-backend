import "@/lib/bootstrap";
import { LoggingService } from "@/lib/services/logging-service";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import express from "express";
import session from "express-session";
import { createConfig } from "express-zod-api";
import createHttpError from "http-errors";
import ui from "swagger-ui-express";
import { Container } from "typedi";
import yaml from "yamljs";
import { AuthService } from "@/auth";

// Workaround for https://github.com/oven-sh/bun/issues/4216.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loggingService = Container.get(LoggingService);
const authService = Container.get(AuthService);

const PORT = parseInt(process.env.APP_PORT || "8000");
const LIMIT_MB = parseInt(process.env.UPLOAD_FILE_SIZE_LIMIT_MB || "50", 10) * 1024 * 1024; // 50 MB;

const getDocsConfig = () => {
  return yaml.load(path.resolve(__dirname, "../public/docs.yaml"));
};

const appSession = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRETKEY!,
});

export const config = createConfig({
  http: { listen: PORT },
  upload: {
    limits: { fileSize: LIMIT_MB },
    limitError: createHttpError(413, "The file is too large"),
    beforeUpload: ({ request }) => {
      if (!request.isAuthenticated()) {
        throw createHttpError(403, "Not authorized");
      }
    },
  },
  cors: true,
  logger: {
    info: (message, meta) => loggingService.info(message, meta),
    debug: (message, meta) => loggingService.debug(message, meta),
    warn: (message, meta) => loggingService.warn(message, meta),
    error: (message, meta) => loggingService.error(message, meta),
  },
  accessLogger: ({ method, path }, logger) =>
    logger.debug(`${chalk.cyan(method)} ${chalk.yellow(path)}`),
  beforeRouting: ({ app }) => {
    const swaggerDocument = getDocsConfig();
    app.use(express.urlencoded({ extended: true }));
    app.use(appSession);
    app.use(authService.passport.initialize());
    app.use(authService.passport.session());
    app.use("/docs", ui.serve, ui.setup(swaggerDocument));
  },
});
