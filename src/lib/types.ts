import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .min(1, "Email is Required")
    .email({ message: "Invalid email address" })
    .endsWith("@gmail.com"),
  username: z
    .string()
    .min(3, "username most be at least 3 character")
    .max(20, "username It should not be more than 20 characters")
      .regex(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, "valid username with _or-"),
  password: z
    .string()
    .min(3, "password most be at least 3 character")
    .max(20, "password It should not be more than 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Minimum 8 characters, Maximum 20 characters, At least one uppercase character, At least one lowercase character, At least one digit, At least one special character ",
    ),
});
export const signInSchema = z.object({
  email: z
      .string()
      .min(1, "Email is Required")
      .email({ message: "Invalid email address" })
      .endsWith("@gmail.com"),
  password: z
      .string()
      .min(3, "password most be at least 3 character")
      .max(20, "password It should not be more than 20 characters")
      .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
          "Minimum 8 characters, Maximum 20 characters, At least one uppercase character, At least one lowercase character, At least one digit, At least one special character ",
      ),
})

export type TSignupSchema = z.infer<typeof userSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;