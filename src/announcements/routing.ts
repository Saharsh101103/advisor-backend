import { createAnnouncement, getAnnouncements } from "@/announcements";
import {
  CreateAnnouncementInputSchema,
  CreateAnnouncementOutputSchema,
  GetAnnoucementsOutputSchema,
} from "@/announcements/schema";
import { publicFactory } from "@/lib/factories";
import { DependsOnMethod } from "express-zod-api";

export const getAnnouncementsEndpoint = publicFactory.build({
  method: "get",
  tag: "Announcements",
  description: "get all Announcements",
  output: GetAnnoucementsOutputSchema,
  handler: async () => {
    return await getAnnouncements();
  },
});

export const createAnnouncementEndpoint = publicFactory.build({
  method: "post",
  tag: "Announcements",
  description: "Create Announcement",
  input: CreateAnnouncementInputSchema,
  output: CreateAnnouncementOutputSchema,
  handler: async ({ input }) => {
    return await createAnnouncement(input);
  },
});

export const announcementsRouting = {
  announcements: new DependsOnMethod({
    get: getAnnouncementsEndpoint,
    post: createAnnouncementEndpoint,
  }),
};
