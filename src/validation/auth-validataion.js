import * as Yup from "yup";

const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .required("Password is required");

const registerValidation = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/\D/, "Field cannot be a number"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: passwordSchema, // Using the password schema defined above
  createdAt: Yup.date().default(() => new Date()),
}).noUnknown(true);

const loginValidation = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/\D/, "Field cannot be a number"),
  password: passwordSchema, // Using the password schema defined above
}).noUnknown(true);

export { registerValidation, loginValidation };
