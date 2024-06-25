import * as Yup from "yup";

const passwordSchema = Yup.string()
  .nullable()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

const updateUserValidation = Yup.object()
  .shape({
    username: Yup.string().nullable().matches(/\D/, "Field cannot be a number"),
    email: Yup.string().nullable().email("Invalid email format"),
    password: passwordSchema,
    avatar: Yup.string().nullable().matches(/\D/, "Field cannot be a number"),
  })
  .noUnknown(true);

export { updateUserValidation };
