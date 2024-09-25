import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least two characters long")
  .max(20, "Username must not be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");


export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Password must contain at least one number (0-9)" });


export const roleValidation = z.enum(["user", "admin"],{
    errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
})

export const signUpSchema  = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordValidation,
    role: roleValidation.default("user"), 
})


