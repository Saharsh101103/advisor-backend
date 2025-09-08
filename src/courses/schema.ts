import { IDSchema } from "@/lib/schema";
import { z } from "zod/v4";

export const CourseSchema = z.object({
  serial_id: z.number(),
  code: z.string(),
  title: z.string(),
  credits: z.number(),
  prerequisites: z.array(z.number()).nullish(),
  description: z.string(),
});

export enum CourseStatus {
  UPCOMING,
  IN_PROGRESS,
  COMPLETED,
}

export type Course = z.infer<typeof CourseSchema>;

export const CreateCourseInputSchema = CourseSchema.omit({ serial_id: true });

export const CreateCourseOutputSchema = IDSchema;

export type CreateCourseInput = z.infer<typeof CreateCourseInputSchema>;
export type CreateCourseOutput = z.infer<typeof CreateCourseOutputSchema>;

export const GetCoursesOutputSchema = z.object({ courses: z.array(CourseSchema) });

export type GetCoursesOutput = z.infer<typeof GetCoursesOutputSchema>;

export const GetStudentCoursesInputSchema = z.object({
  student_id: z.string(),
  status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED"]),
});

export const GetStudentCoursesOutputSchema = z.object({
  courses: z.array(
    CourseSchema.omit({ prerequisites: true, description: true }).extend({
      progress: z.number(),
      instructor: z.string(),
      status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED"]),
    })
  ),
});

export type GetStudentCoursesInput = z.infer<typeof GetStudentCoursesInputSchema>;
export type GetStudentCoursesOutput = z.infer<typeof GetStudentCoursesOutputSchema>;

export const AssignStudentCourseInputSchema = z.object({
  student_id: z.number(),
  course_id: z.number(),
  instructor_id: z.number(),
  status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED"]).nullish(),
  progress: z.number().nullish(),
});

export const AssignStudentCourseOutputSchema = IDSchema;

export type AssignStudentCourseInput = z.infer<typeof AssignStudentCourseInputSchema>;
export type AssignStudentCourseOutput = z.infer<typeof AssignStudentCourseOutputSchema>;
