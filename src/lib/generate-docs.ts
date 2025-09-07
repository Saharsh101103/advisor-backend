import "@/lib/bootstrap";
import manifest from "@/../package.json";
import { config } from "@/config";
import routing from "@/routing";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { Documentation } from "express-zod-api";

const filePath = "public/docs.yaml";
const dirPath = dirname(filePath);

// Ensure the directory exists
await mkdir(dirPath, { recursive: true });

// Generate and write the YAML documentation
await writeFile(
  filePath,
  new Documentation({
    routing,
    config,
    version: manifest.version,
    title: "Advisor APIs",
    serverUrl: ["http://localhost:8000"],
  }).getSpecAsYaml(),
  "utf-8"
);
