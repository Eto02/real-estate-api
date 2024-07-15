import * as yup from "yup";

const imageMimeTypes = ["image/jpeg", "image/png"];
const videoMimeTypes = ["video/mp4", "video/quicktime"];
const documentMimeTypes = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const fileValidation = yup.object().shape({
  files: yup
    .array()
    .of(
      yup.object().shape({
        originalname: yup.string().required(),
        mimetype: yup
          .string()
          .oneOf([...imageMimeTypes, ...videoMimeTypes, ...documentMimeTypes])
          .required(),
        size: yup.number().max(5000000).required(), // Max 5MB
      })
    )
    .required(),
});

const getFileValidation = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, "The ID is in the wrong format")
  .required("The ID is in the wrong format");

export { fileValidation, getFileValidation };
