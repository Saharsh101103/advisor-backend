import { authMiddleware } from "@/lib/auth";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import {
  EndpointsFactory,
  ensureHttpError,
  getMessageFromError,
  InputValidationError,
  Middleware,
  ResultHandler,
} from "express-zod-api";
import z from "zod/v4";

const responseHandler = new ResultHandler({
  positive: (data) => ({
    schema: z.object({ status: z.literal("success"), data }),
  }),
  negative: z.object({
    status: z.literal("error"),
    issues: z.array(z.custom<z.core.$ZodIssue>()).optional(),
    message: z.string(),
  }),
  handler: ({ error, output, response, logger }) => {
    if (error) {
      logger.error(error.message);
      console.error(error.stack);
      const { statusCode } = ensureHttpError(error);

      if (error instanceof InputValidationError) {
        response.status(statusCode).json({
          status: "error",
          message: error.message,
          issues: error.cause.issues,
        });
        return;
      }

      if (statusCode === 500) {
        response.status(statusCode).json({ status: "error", message: DEFAULT_ERROR_MESSAGE });
        return;
      }

      const message = getMessageFromError(error);
      response.status(statusCode).json({ status: "error", message });
      return;
    }
    response.status(200).json({ status: "success", data: output });
  },
});

export const streamingFactory = new EndpointsFactory(
  new ResultHandler({
    negative: z.object({
      status: z.literal("error"),
      issues: z.array(z.custom<z.core.$ZodIssue>()).optional(),
      message: z.string(),
    }),
    positive: { schema: z.string(), mimeType: "text/plain" },
    handler: async ({ response, error, logger }) => {
      if (error) {
        logger.error(error.message);
        console.error(error.stack);
        const { statusCode } = ensureHttpError(error);

        if (error instanceof InputValidationError) {
          response.status(statusCode).json({
            status: "error",
            message: error.message,
            issues: error.cause.issues,
          });
          return;
        }

        if (statusCode === 500) {
          response.status(statusCode).json({ status: "error", message: DEFAULT_ERROR_MESSAGE });
          return;
        }

        const message = getMessageFromError(error);
        response.status(statusCode).json({ status: "error", message });
        return;
      }
    },
  })
)
  .addMiddleware(
    new Middleware({
      handler: async ({ request, response }) => {
        response.setHeader("Content-Type", "text/plain");

        return {
          request,
          response,
        };
      },
    })
  )
  .addMiddleware(authMiddleware);

export const publicFactory = new EndpointsFactory(responseHandler);
export const protectedFactory = publicFactory.addMiddleware(authMiddleware);
export const noContentFactory = new EndpointsFactory(
  new ResultHandler({
    positive: { statusCode: 204, mimeType: null, schema: z.never() },
    negative: {
      statusCode: 404,
      mimeType: null,
      schema: z.object({
        status: z.literal("error"),
        issues: z.array(z.custom<z.core.$ZodIssue>()).optional(),
        message: z.string(),
      }),
    },
    handler: ({ error, response, logger }) => {
      if (error) {
        logger.error(error.message);
        console.error(error.stack);
        const { statusCode } = ensureHttpError(error);

        if (error instanceof InputValidationError) {
          response.status(statusCode).json({
            status: "error",
            message: error.message,
            issues: error.cause.issues,
          });
          return;
        }

        if (statusCode === 500) {
          response.status(statusCode).json({ status: "error", message: DEFAULT_ERROR_MESSAGE });
          return;
        }

        const message = getMessageFromError(error);
        response.status(statusCode).json({ status: "error", message });
        return;
      }

      response.status(204).end(); // no content
    },
  })
);
