import { config } from "@/config";
import routing from "@/routing";
import { createServer } from "express-zod-api";

await createServer(config, routing);
