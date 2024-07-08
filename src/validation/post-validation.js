import * as Yup from "yup";
const getPostValidation = Yup.string()
  .matches(/^[0-9a-fA-F]{24}$/, "The ID is in the wrong format")
  .required("The ID is in the wrong format");
const createPostValidation = Yup.object()
  .shape({
    data: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      images: Yup.array()
        .of(Yup.string().url("Each image must be a valid URL"))
        .required("Images are required"),
      bedroom: Yup.number()
        .min(1, "Minimum 1 bedroom")
        .required("Bedroom is required"),
      bathroom: Yup.number()
        .min(1, "Minimum 1 bathroom")
        .required("Bathroom is required"),
      price: Yup.number()
        .min(0, "Price must be non-negative")
        .required("Price is required"),
      address: Yup.string().required("Address is required"),
      latitude: Yup.string()
        .matches(
          /^(-?\d{1,2}\.\d{4})$/,
          "Latitude must be a valid number with 4 decimal places"
        )
        .required("Latitude is required"),
      longitude: Yup.string()
        .matches(
          /^[-+]?(1[0-7]\d|[1-9]?\d)\.\d{4}$/,
          "Longitude must be a valid number between -180 and 180 with 4 decimal places"
        )
        .required("Longitude is required"),
      type: Yup.string()
        .oneOf(["rent", "sale"], 'Type must be either "rent" or "sale"')
        .required("Type is required"),
      property: Yup.string()
        .oneOf(
          ["apartment", "house", "condo"],
          'Property must be either "apartment", "house", or "condo"'
        )
        .required("Property is required"),
      city: Yup.string().required("City is required"),
    }),
    detail: Yup.object().shape({
      desc: Yup.string().required("Description is required"),
      utilities: Yup.string().required("Utilities information is required"),
      pet: Yup.string()
        .oneOf(
          ["allowed", "not allowed"],
          'Pet must be either "allowed" or "not allowed"'
        )
        .required("Pet information is required"),
      income: Yup.string().required("Income information is required"),
      size: Yup.number()
        .min(0, "Size must be non-negative")
        .required("Size is required"),
      school: Yup.number()
        .min(0, "School distance must be non-negative")
        .required("School distance is required"),
      bus: Yup.number()
        .min(0, "Bus distance must be non-negative")
        .required("Bus distance is required"),
      restaurant: Yup.number()
        .min(0, "Restaurant distance must be non-negative")
        .required("Restaurant distance is required"),
    }),
  })
  .noUnknown(true);
export { getPostValidation, createPostValidation };
