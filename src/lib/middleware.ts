import { Middleware } from "express-zod-api";
import createHttpError from "http-errors";

export const authMiddleware = new Middleware({
  handler: async ({ request }) => {
    if (!request.isAuthenticated()) {
      throw createHttpError.Unauthorized();
    }

    return { user: request.user };
  },
});
