import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required')
})

export const signUpSchema = z.object({
  firstname: z.string().trim().min(1, 'First name is required').min(4,'minimum 4 character'),
  lastname: z.string().trim().min(1, 'Last name is required').min(4,'minimum 4 character'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: z.string().trim().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
   
});
