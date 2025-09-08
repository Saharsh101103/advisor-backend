import {
  createStudentQuery,
  createUserQuery,
  validateUserQuery,
  getUserByIdQuery,
  createAdvisorQuery,
  getStudentsQuery,
  getAdvisorsQuery,
} from "@/lib/repository";
import { tryCatch } from "@/lib/utils";

import { createClient } from "@/edgeql-js";
import createHttpError from "http-errors";
import {
  CreateAdvisorInput,
  CreateStudentInput,
  GetAdvisorsOutput,
  GetStudentAcademicPerformanceInput,
  GetStudentsOutput,
} from "@/users/schema";
import { getDegrees } from "@/degree-requirements";

const client = createClient();

export async function createStudent(input: CreateStudentInput) {
  const { data: user, error: userCreationError } = await tryCatch(
    createUserQuery(client, input.user)
  );
  if (userCreationError) {
    throw createHttpError.BadGateway(userCreationError.message);
  }

  const { data: student, error: studentCreationError } = await tryCatch(
    createStudentQuery(client, {
      advisor_email: input.advisor_email,
      user_id: user.id,
      completed_credits: input.completed_credits,
      enrollment_year: input.enrollment_year,
      expected_graduation: input.expected_graduation,
      gpa: input.gpa,
      major: input.major,
      required_credits: input.required_credits,
    })
  );
  if (studentCreationError) {
    throw createHttpError.BadGateway(studentCreationError.message);
  }
  return student;
}

export async function createAdvisor(input: CreateAdvisorInput) {
  const { data: user, error: userCreationError } = await tryCatch(
    createUserQuery(client, input.user)
  );
  if (userCreationError) {
    throw createHttpError.BadGateway(userCreationError.message);
  }

  const { data: advisor, error: advisorCreationError } = await tryCatch(
    createAdvisorQuery(client, {
      department: input.department,
      office: input.office,
      office_hours: input.office_hours,
      phone: input.phone,
      user_id: user.id,
    })
  );
  if (advisorCreationError) {
    throw createHttpError.BadGateway(advisorCreationError.message);
  }

  return advisor;
}

export async function validateUser(input: { email: string; password: string }) {
  const { data, error } = await tryCatch(validateUserQuery(client, input));
  if (error || !data?.id) {
    throw createHttpError.BadGateway(error ? error.message : "user not found");
  }
  return data.id;
}

export async function getUserById(input: { id: string }) {
  const { data, error } = await tryCatch(getUserByIdQuery(client, input));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }
  return data;
}

export async function getStudents(): Promise<GetStudentsOutput> {
  const { data, error } = await tryCatch(getStudentsQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }

  const result = data.map((student) => ({
    ...student,
    advisor: student.advisor.user.name,
    serial_id: student.user.serial_id,
    name: student.user.name,
    email: student.user.email,
  }));
  return { students: result };
}

export async function getAdvisors(): Promise<GetAdvisorsOutput> {
  const { data, error } = await tryCatch(getAdvisorsQuery(client));
  if (error) {
    throw createHttpError.BadGateway(error.message);
  }
  const result = data.map((advisor) => ({
    ...advisor,
    serial_id: advisor.user.serial_id,
    name: advisor.user.name,
    email: advisor.user.email,
    students: advisor.students.map((id) => id.serial_id),
  }));
  return { advisors: result };
}

export async function getStudentAcademicPerformance(input: GetStudentAcademicPerformanceInput) {
  const degrees = await getDegrees();
  console.log("degrees:", degrees);
  const studentsData = await getStudents();

  const completedCredits = studentsData.students
    .filter((stu) => stu.serial_id === parseInt(input.student_id))
    .at(0)?.completed_credits;
  const totalCredits = degrees.degrees.at(0)?.total_credits;
  console.log("totalCredits:", totalCredits);

  console.log("completedCredits:", completedCredits);

  const academic_performance = Math.round((completedCredits ?? 0 / totalCredits!) * 100);

  return { academic_performance };
}
