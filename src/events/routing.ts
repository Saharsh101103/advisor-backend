import { createEvent, getEvents } from "@/events";
import {
  CreateEventInputSchema,
  CreateEventOutputSchema,
  GetEventsOutputSchema,
} from "@/events/schema";
import { publicFactory } from "@/lib/factories";
import { DependsOnMethod } from "express-zod-api";

export const getEventsEndpoint = publicFactory.build({
  method: "get",
  tag: "Events",
  description: "get all events",
  output: GetEventsOutputSchema,
  handler: async () => {
    return await getEvents();
  },
});

export const createEventEndpoint = publicFactory.build({
  method: "post",
  tag: "Events",
  description: "Create Event",
  input: CreateEventInputSchema,
  output: CreateEventOutputSchema,
  handler: async ({ input }) => {
    return await createEvent(input);
  },
});

export const eventsRouting = {
  events: new DependsOnMethod({
    get: getEventsEndpoint,
    post: createEventEndpoint,
  }),
};
