import {
  CreateDegreeInput,
  CreateRequirementCategoriesInput,
  CreateRequirementCourseInput,
  GetDegreesOutput,
} from "@/degree-requirements/schema";
import {
  createDegreeQuery,
  createRequirementCategoryQuery,
  createRequirementCourseQuery,
  getDegreesQuery,
} from "@/lib/repository";
import { tryCatch } from "@/lib/utils";
import { createClient } from "@/edgeql-js";
import createHttpError from "http-errors";

const client = createClient();

export async function createRequirementCourse(input: CreateRequirementCourseInput) {
  const { data, error } = await tryCatch(
    createRequirementCourseQuery(client, {
      ...input,
      status: input.status as "UPCOMING" | "IN_PROGRESS" | "COMPLETED",
    })
  );
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return data;
}

export async function createRequirementCategory(input: CreateRequirementCategoriesInput) {
  const { data, error } = await tryCatch(createRequirementCategoryQuery(client, input));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return data;
}

export async function createDegree(input: CreateDegreeInput) {
  const { data, error } = await tryCatch(createDegreeQuery(client, input));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return data;
}

export async function getDegrees(): Promise<GetDegreesOutput> {
  const { data, error } = await tryCatch(getDegreesQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  return { degrees: data };
}
