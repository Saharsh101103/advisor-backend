import { assignStudentCourse, createCourse, getCourses, getStudentCourses } from "@/courses";
import {
  AssignStudentCourseInputSchema,
  AssignStudentCourseOutputSchema,
  CreateCourseInputSchema,
  CreateCourseOutputSchema,
  GetCoursesOutputSchema,
  GetStudentCoursesInputSchema,
  GetStudentCoursesOutputSchema,
} from "@/courses/schema";
import { publicFactory } from "@/lib/factories";
import { DependsOnMethod } from "express-zod-api";

const createCourseEndpoint = publicFactory.build({
  method: "post",
  tag: "Courses",
  description: "Create Course",
  input: CreateCourseInputSchema,
  output: CreateCourseOutputSchema,
  handler: async ({ input }) => {
    return await createCourse(input);
  },
});

const getCoursesEndpoint = publicFactory.build({
  method: "get",
  tag: "Courses",
  description: "Get Courses",
  output: GetCoursesOutputSchema,
  handler: async () => {
    return await getCourses();
  },
});

const getStudentCoursesEndpoint = publicFactory.build({
  method: "get",
  tag: "Courses",
  description: "Get Student Courses",
  input: GetStudentCoursesInputSchema,
  output: GetStudentCoursesOutputSchema,
  handler: async ({ input }) => {
    return await getStudentCourses(input);
  },
});

const assignStudentCourseEndpoint = publicFactory.build({
  method: "post",
  tag: "Courses",
  description: "Assign Course",
  input: AssignStudentCourseInputSchema,
  output: AssignStudentCourseOutputSchema,
  handler: async ({ input }) => {
    return await assignStudentCourse(input);
  },
});

export const coursesRouting = {
  courses: new DependsOnMethod({
    get: getCoursesEndpoint,
    post: createCourseEndpoint,
  }).nest({
    student: new DependsOnMethod({
      get: getStudentCoursesEndpoint,
      post: assignStudentCourseEndpoint,
    }),
  }),
};
