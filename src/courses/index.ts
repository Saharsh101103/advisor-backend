import {
  assignStudentCourseQuery,
  createCourseQuery,
  getCoursesQuery,
  getStudentCoursesQuery,
} from "@/lib/repository";
import { tryCatch } from "@/lib/utils";
import { createClient } from "@/edgeql-js";
import {
  AssignStudentCourseInput,
  CreateCourseInput,
  GetCoursesOutput,
  GetStudentCoursesInput,
  GetStudentCoursesOutput,
} from "@/courses/schema";
import createHttpError from "http-errors";

const client = createClient();

export async function createCourse(input: CreateCourseInput) {
  const { data, error } = await tryCatch(createCourseQuery(client, input));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }
  return data;
}

export async function getCourses(): Promise<GetCoursesOutput> {
  const { data, error } = await tryCatch(getCoursesQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }
  return {
    courses: data.map((course) => ({
      ...course,
      prerequisites: course.prerequisites.map((pre) => pre.serial_id),
    })),
  };
}

export async function getStudentCourses(
  input: GetStudentCoursesInput
): Promise<GetStudentCoursesOutput> {
  const { data, error } = await tryCatch(
    getStudentCoursesQuery(client, { status: input.status, student_id: parseInt(input.student_id) })
  );
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  const coursesDto = data.map((course) => ({
    ...course,
    instructor: course.instructor.user.name,
    progress: course.progress ?? 0,
    status: course.status as "UPCOMING" | "IN_PROGRESS" | "COMPLETED",
    ...course.course,
  }));
  return { courses: coursesDto };
}

export async function assignStudentCourse(input: AssignStudentCourseInput) {
  const { data, error } = await tryCatch(
    assignStudentCourseQuery(client, { ...input, status: input.status ?? "UPCOMING" })
  );
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }
  return data;
}
