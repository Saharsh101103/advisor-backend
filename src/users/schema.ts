import { CourseSchema } from "@/courses/schema";
import { IDSchema } from "@/lib/schema";
import { z } from "zod/v4";

export const UserSchema = z.object({
  serial_id: z.number(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const CreateUserInputSchema = UserSchema.omit({ serial_id: true });

export type User = z.infer<typeof UserSchema>;

export const AdvisorSchema = z.object({
  user: UserSchema,
  department: z.string(),
  office: z.string().nullish(),
  office_hours: z.string().nullish(),
  phone: z.string().nullish(),
  role: z.string(),
});

export type Advisor = z.infer<typeof AdvisorSchema>;

export const StudentSchema = z.object({
  user: UserSchema,
  major: z.string(),
  enrollment_year: z.number(),
  expected_graduation: z.number(),
  gpa: z.number(),
  completed_credits: z.number(),
  required_credits: z.number(),
  advisor: AdvisorSchema,
  role: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

export const CreateStudentInputSchema = StudentSchema.omit({
  user: true,
  advisor: true,
  role: true,
}).extend({
  user: CreateUserInputSchema,
  advisor_email: z.email(),
});

export const CreateStudentOutputSchema = IDSchema;

export type CreateStudentInput = z.infer<typeof CreateStudentInputSchema>;
export type CreateStudentOutput = z.infer<typeof CreateStudentOutputSchema>;

export const CreateAdvisorInputSchema = AdvisorSchema.omit({ user: true, role: true }).extend({
  user: CreateUserInputSchema,
});

export const CreateAdvisorOutputSchema = IDSchema;

export type CreateAdvisorInput = z.infer<typeof CreateAdvisorInputSchema>;
export type CreateAdvisorOutput = z.infer<typeof CreateAdvisorOutputSchema>;

export const GetStudentsOutputSchema = z.object({
  students: z.array(
    StudentSchema.omit({ advisor: true, user: true, role: true }).extend({
      name: z.string(),
      email: z.string(),
      serial_id: z.number(),
      advisor: z.string(),
    })
  ),
});

export type GetStudentsOutput = z.infer<typeof GetStudentsOutputSchema>;

export const GetAdvisorsOutputSchema = z.object({
  advisors: z.array(
    AdvisorSchema.omit({ user: true, role: true }).extend({
      name: z.string(),
      email: z.string(),
      serial_id: z.number(),
      students: z.array(z.number()),
    })
  ),
});

export type GetAdvisorsOutput = z.infer<typeof GetAdvisorsOutputSchema>;

export const GetStudentAcademicPerformanceInputSchema = z.object({ student_id: z.string() });

export const GetStudentAcademicPerformanceOutputSchema = z.object({
  academic_performance: z.number(),
});

export type GetStudentAcademicPerformanceInput = z.infer<
  typeof GetStudentAcademicPerformanceInputSchema
>;
export type GetStudentAcademicPerformanceOutput = z.infer<
  typeof GetStudentAcademicPerformanceOutputSchema
>;
