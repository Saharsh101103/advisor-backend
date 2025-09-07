import { AuthService } from "@/auth";
import { LoginInputSchema, LoginOutputSchema } from "@/auth/schema";
import { protectedFactory, publicFactory } from "@/lib/factories";
import { sleep } from "@/lib/utils";
import { getUserById } from "@/users";
import { Middleware, type Routing } from "express-zod-api";
import createHttpError from "http-errors";
import { Container } from "typedi";
import z from "zod/v4";

const authService = Container.get(AuthService);

const SessionOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullish(),
  auth_provider: z.string(),
});

const logoutMiddleware = new Middleware({
  handler: async ({ request, response }) => {
    request.logout((err) => {
      if (err) {
        throw createHttpError.InternalServerError("Logout failed!");
      }

      request.session.destroy((err) => {
        if (err) {
          throw createHttpError.InternalServerError("Failed to remove cookie!");
        }

        response.clearCookie("connect.sid");
      });
    });

    await sleep(200); // Workaround to prevent request completion before the cookie is unset
    return {};
  },
});

const localLogin = publicFactory.use(authService.localLoginHandler()).build({
  method: "post",
  tag: "Auth",
  description: "Login as a user",
  input: LoginInputSchema,
  output: LoginOutputSchema,
  handler: async () => {
    return { message: "Logged in successfully!" };
  },
});

const logout = publicFactory.addMiddleware(logoutMiddleware).build({
  method: "post",
  tag: "Auth",
  description: "Logout the signed in user",
  output: LoginOutputSchema,
  handler: async () => {
    return { message: "Logged out successfully!" };
  },
});

const session = protectedFactory.build({
  method: "get",
  tag: "Auth",
  description: "Get details of the currently logged-in user",
  output: SessionOutputSchema,
  handler: async ({ options }) => {
    const userId = options.user.id;
    const user = await getUserById({ id: userId });
    if (!user) {
      throw createHttpError.NotFound(`User not found: ${userId}`);
    }

    const { id, email, name, serial_id } = user;

    return {
      id,
      serial_id,
      name: name,
      email,
      auth_provider: options.user.provider,
    };
  },
});

export default {
  auth: {
    login: localLogin,
    logout: logout,
    session: session,
  },
} satisfies Routing;
