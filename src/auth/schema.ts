import { MessageSchema, PaginationSchema } from "@/lib/schema";
import z from "zod/v4";

export const LoginInputSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export const LogoutInputSchema = PaginationSchema.extend({
  id: z.uuid(),
});

export const LoginOutputSchema = MessageSchema;
export const LogoutOutputSchema = LoginOutputSchema;
