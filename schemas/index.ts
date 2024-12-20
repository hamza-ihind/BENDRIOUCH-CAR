import * as z from "zod";

const phoneRegex = new RegExp(/^(?:(?:\+|00)212|0)([5-7])([0-9]{8})$/);

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Le mot de passe est trop court!" })
    .max(20, { message: "Le mot de passe est trop long!" }),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe est trop court!" })
    .max(20, { message: "Le mot de passe est trop long!" }),
});

export const PersonalInfoSchema = z.object({
  image: z.string(),
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  city: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  birthday: z.date(),
});

export const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
