import {
  createDegree,
  createRequirementCategory,
  createRequirementCourse,
  getDegrees,
} from "@/degree-requirements";
import {
  CreateDegreeInputSchema,
  CreateDegreeOutputSchema,
  CreateRequirementCategoriesInputSchema,
  CreateRequirementCategoriesOutputSchema,
  CreateRequirementCourseInputSchema,
  GetDegreesOutputSchema,
} from "@/degree-requirements/schema";
import { publicFactory } from "@/lib/factories";
import { DependsOnMethod } from "express-zod-api";

export const getDegreesEndpoint = publicFactory.build({
  method: "get",
  tag: "Degrees",
  description: "get all degrees",
  output: GetDegreesOutputSchema,
  handler: async () => {
    return await getDegrees();
  },
});

export const createDegreeEndpoint = publicFactory.build({
  method: "post",
  tag: "Degrees",
  description: "Create Degree",
  input: CreateDegreeInputSchema,
  output: CreateDegreeOutputSchema,
  handler: async ({ input }) => {
    return await createDegree(input);
  },
});

export const createCategoryRequirementEndpoint = publicFactory.build({
  method: "post",
  tag: "Degrees",
  description: "Create Requirement Category",
  input: CreateRequirementCategoriesInputSchema,
  output: CreateRequirementCategoriesOutputSchema,
  handler: async ({ input }) => {
    return await createRequirementCategory(input);
  },
});

export const createCourseRequirementEndpoint = publicFactory.build({
  method: "post",
  tag: "Degrees",
  description: "Create Course Requirement",
  input: CreateRequirementCourseInputSchema,
  output: CreateRequirementCategoriesOutputSchema,
  handler: async ({ input }) => {
    return await createRequirementCourse(input);
  },
});

export const degreesRouting = {
  degrees: new DependsOnMethod({
    get: getDegreesEndpoint,
    post: createDegreeEndpoint,
  }).nest({
    category: createCategoryRequirementEndpoint,
    course: createCourseRequirementEndpoint,
  }),
};
