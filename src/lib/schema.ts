import z from "zod/v4";

export const IDSchema = z.object({
  id: z.uuid(),
});

export const MessageSchema = z.object({
  message: z.string(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().gte(0).optional(),
  limit: z.enum(["10", "20", "30", "40", "50"]).transform(Number).optional(),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;

export const UserDtoSchema = z.object({
  id: z.uuid(),
  email_id: z.string().nullish(),
  first_name: z.string().nonempty(),
  last_name: z.string().nullish(),
});
