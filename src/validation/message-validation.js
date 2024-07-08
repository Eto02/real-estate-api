import * as Yup from "yup";
const getMesasgeValidation = Yup.string()
  .matches(/^[0-9a-fA-F]{24}$/, "The ID is in the wrong format")
  .required("The ID is in the wrong format");
const createMessageValidation = Yup.object()
  .shape({
    text: Yup.string().required("Text is required"),
  })
  .noUnknown(true);

export { createMessageValidation, getMesasgeValidation };
