import * as Yup from "yup";

const getChatValidation = Yup.string()
  .matches(/^[0-9a-fA-F]{24}$/, "The ID is in the wrong format")
  .required("The ID is in the wrong format");

const createChatValidation = Yup.object()
  .shape({
    receiverId: getChatValidation,
  })
  .noUnknown(true);
export { getChatValidation, createChatValidation };
