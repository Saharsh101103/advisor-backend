import { IDSchema } from "@/lib/schema";
import { z } from "zod/v4";

export const AnnouncementSchema = z.object({
  serial_id: z.number(),
  title: z.string(),
  content: z.string(),
  date: z.iso.datetime(),
  author: z.string(),
});

export const CreateAnnouncementInputSchema = AnnouncementSchema.omit({
  serial_id: true,
  author: true,
  date: true,
}).extend({
  author: z.number(),
});

export const CreateAnnouncementOutputSchema = IDSchema;

export type CreateAnnouncementInput = z.infer<typeof CreateAnnouncementInputSchema>;
export type CreateAnnouncementOutput = z.infer<typeof CreateAnnouncementOutputSchema>;

export const GetAnnoucementsOutputSchema = z.object({
  announcements: z.array(AnnouncementSchema),
});

export type GetAnnoucementsOutput = z.infer<typeof GetAnnoucementsOutputSchema>;
