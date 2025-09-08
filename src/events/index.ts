import { CreateEventInput, GetEventsOutput } from "@/events/schema";
import { createEventQuery, getEventsQuery } from "@/lib/repository";
import { tryCatch } from "@/lib/utils";
import { createClient } from "@/edgeql-js";
import createHttpError from "http-errors";

const client = createClient();

export async function createEvent(input: CreateEventInput) {
  const { data, error } = await tryCatch(
    createEventQuery(client, { ...input, date: new Date(input.date) })
  );
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return data;
}

export async function getEvents(): Promise<GetEventsOutput> {
  const { data, error } = await tryCatch(getEventsQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return { events: data.map((event) => ({ ...event, date: event.date.toISOString() })) };
}
