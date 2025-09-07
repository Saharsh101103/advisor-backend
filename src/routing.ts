import { userRouting } from "@/users/routing";
import { type Routing } from "express-zod-api";

export default {
  api: {
    v1: {
      // Add your API routes here
      ...userRouting,
    },
  },
} satisfies Routing;
