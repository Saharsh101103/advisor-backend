import { announcementsRouting } from "@/announcements/routing";
import { coursesRouting } from "@/courses/routing";
import { degreesRouting } from "@/degree-requirements/routing";
import { eventsRouting } from "@/events/routing";
import { userRouting } from "@/users/routing";
import { type Routing } from "express-zod-api";

export default {
  api: {
    v1: {
      // Add your API routes here
      ...userRouting,
      ...coursesRouting,
      ...announcementsRouting,
      ...eventsRouting,
      ...degreesRouting,
    },
  },
} satisfies Routing;
