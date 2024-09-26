import { z } from "zod";

const UserSignUpSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required." }),
  lastname: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(12, { message: "Password cannot exceed 12 characters." }),
});

const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(12, { message: "Password cannot exceed 12 characters." }),
});

type UserLoginType = z.infer<typeof UserLoginSchema>;
type UserSignUpType = z.infer<typeof UserSignUpSchema>;

export type { UserSignUpType, UserLoginType };
export { UserSignUpSchema, UserLoginSchema };
