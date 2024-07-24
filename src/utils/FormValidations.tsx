import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
});

export const signUpSchema = z.object({
  firstname: z.string().trim().min(4, 'First name is required'),
  lastname: z.string().trim().min(4, 'Last name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
})