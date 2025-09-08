import { CourseSchema, CreateCourseInputSchema } from "@/courses/schema";
import { IDSchema } from "@/lib/schema";
import { z } from "zod/v4";

export const RequirementCoursesSchema = z.object({
  serial_id: z.number(),
  course: CourseSchema,
  status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED"]),
});

export const RequirementCategoriesSchema = z.object({
  serial_id: z.number(),
  name: z.string(),
  required_credits: z.number(),
  completed_credits: z.number(),
  courses: z.array(RequirementCoursesSchema),
});

export const DegreeSchema = z.object({
  serial_id: z.number(),
  major: z.string(),
  total_credits: z.number(),
  categories: z.array(RequirementCategoriesSchema),
});

export type Degree = z.infer<typeof DegreeSchema>;

export const CreateDegreeInputSchema = DegreeSchema.omit({
  serial_id: true,
  categories: true,
}).extend({ categories: z.array(z.number()) });

export const CreateDegreeOutputSchema = IDSchema;

export type CreateDegreeInput = z.infer<typeof CreateDegreeInputSchema>;
export type CreateDegreeOutput = z.infer<typeof CreateDegreeOutputSchema>;

export const CreateRequirementCategoriesInputSchema = RequirementCategoriesSchema.omit({
  courses: true,
  serial_id: true,
}).extend({ courses: z.array(z.number()) });

export const CreateRequirementCategoriesOutputSchema = IDSchema;

export type CreateRequirementCategoriesInput = z.infer<
  typeof CreateRequirementCategoriesInputSchema
>;
export type CreateRequirementCategoriesOutput = z.infer<
  typeof CreateRequirementCategoriesOutputSchema
>;

export const CreateRequirementCourseInputSchema = RequirementCoursesSchema.omit({
  serial_id: true,
  course: true,
}).extend({ course_id: z.number() });

export const CreateRequirementCourseOutputSchema = IDSchema;

export type CreateRequirementCourseInput = z.infer<typeof CreateRequirementCourseInputSchema>;
export type CreateRequirementCourseOutputSchema = z.infer<
  typeof CreateRequirementCategoriesOutputSchema
>;

export const GetDegreesOutputSchema = z.object({
  degrees: z.array(DegreeSchema),
});

export type GetDegreesOutput = z.infer<typeof GetDegreesOutputSchema>;
