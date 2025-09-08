import { IDSchema } from "@/lib/schema";
import { z } from "zod/v4";

export enum EventType {
  CLASS,
  ADVISING,
  DEADLINE,
}

export const EventSchema = z.object({
  serial_id: z.number(),
  title: z.string(),
  date: z.iso.datetime(),
  time: z.string(),
  type: z.enum(["CLASS", "ADVISING", "DEADLINE"]),
  description: z.string(),
  location: z.string().nullish(),
});

export type Event = z.infer<typeof EventSchema>;

export const CreateEventInputSchema = EventSchema.omit({ serial_id: true });

export const CreateEventOutputSchema = IDSchema;

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;
export type CreateEventOutput = z.infer<typeof CreateEventOutputSchema>;

export const GetEventsOutputSchema = z.object({
  events: z.array(EventSchema),
});

export type GetEventsOutput = z.infer<typeof GetEventsOutputSchema>;
