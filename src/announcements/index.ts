import { CreateAnnouncementInput, GetAnnoucementsOutput } from "@/announcements/schema";
import { createAnnouncementQuery, getAnnouncementsQuery } from "@/lib/repository";
import { tryCatch } from "@/lib/utils";
import { createClient } from "@/edgeql-js";
import createHttpError from "http-errors";

const client = createClient();

export async function createAnnouncement(input: CreateAnnouncementInput) {
  const { data, error } = await tryCatch(createAnnouncementQuery(client, input));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return data;
}

export async function getAnnouncements(): Promise<GetAnnoucementsOutput> {
  const { data, error } = await tryCatch(getAnnouncementsQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  const announcementsDto = data.map((announcement) => ({
    ...announcement,
    author: announcement.author.name,
    date: announcement.date.toISOString(),
  }));

  return { announcements: announcementsDto };
}
