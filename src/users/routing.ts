import { publicFactory } from "@/lib/factories";
import { createAdvisor, createStudent, getAdvisors, getStudents } from "@/users";
import {
  CreateAdvisorInputSchema,
  CreateAdvisorOutputSchema,
  CreateStudentInputSchema,
  CreateStudentOutputSchema,
  GetAdvisorsOutputSchema,
  GetStudentsOutputSchema,
} from "@/User/schema";
import { DependsOnMethod } from "express-zod-api";

const createStudentEndpoint = publicFactory.build({
  method: "post",
  tag: "Students",
  description: "Create new student",
  input: CreateStudentInputSchema,
  output: CreateStudentOutputSchema,
  handler: async ({ input }) => {
    return await createStudent(input);
  },
});

const getStudentsEndpoint = publicFactory.build({
  method: "get",
  tag: "Students",
  description: "get all student",
  output: GetStudentsOutputSchema,
  handler: async () => {
    return await getStudents();
  },
});

const createAdvisorEndpoint = publicFactory.build({
  method: "post",
  tag: "Advisors",
  description: "Create new advisor",
  input: CreateAdvisorInputSchema,
  output: CreateAdvisorOutputSchema,
  handler: async ({ input }) => {
    return await createAdvisor(input);
  },
});

const getAdvisorsEndpoint = publicFactory.build({
  method: "get",
  tag: "Advisors",
  description: "get all advisors",
  output: GetAdvisorsOutputSchema,
  handler: async () => {
    return await getAdvisors();
  },
});

const studentsRouting = new DependsOnMethod({
  get: getStudentsEndpoint,
  post: createStudentEndpoint,
});

const advisorsRouting = new DependsOnMethod({
  get: getAdvisorsEndpoint,
  post: createAdvisorEndpoint,
});

export const userRouting = {
  students: studentsRouting,
  advisors: advisorsRouting,
};
