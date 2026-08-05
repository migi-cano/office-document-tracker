import { z } from "zod";

export const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name is required."),

    lastName: z
      .string()
      .min(2, "Last name is required."),

    email: z
      .string()
      .email("Invalid email address."),

    password: z.string(),

    role: z.enum([
      "Admin",
      "Staff",
    ]),
  })
  .superRefine((data, ctx) => {
    if (
      data.password.length > 0 &&
      data.password.length < 8
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message:
          "Password must be at least 8 characters.",
      });
    }
  });

export type UserFormData = z.infer<typeof userSchema>;