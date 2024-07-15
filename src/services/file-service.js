import path from "path";
import { prisma } from "../application/database.js";
import {
  fileValidation,
  getFileValidation,
} from "../validation/file-validation.js";
import { validate } from "../validation/validation.js";

const create = async (req) => {
  const files = await validate(fileValidation, { files: req.files });
  console.log(files);
  console.log(req.files);

  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    path: file.path,
  }));

  await prisma.file.createMany({
    data: uploadedFiles,
  });

  const savedFiles = await prisma.file.findMany({
    where: {
      filename: {
        in: uploadedFiles.map((file) => file.filename),
      },
    },
  });
  return savedFiles;
};

const downlaodfile = async (req) => {
  const id = await validate(getFileValidation, req.params.id);

  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  const filePath = path.resolve(file.path);
  return { filePath, fileName: file.name };
};

export default { create, downlaodfile };
