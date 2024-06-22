import { ValidationError } from "yup";

const validate = async (schema, request) => {
  const result = await schema.validate(request, { abortEarly: false });
  if (result instanceof ValidationError) {
    throw result;
  } else {
    return result;
  }
};

export { validate };
