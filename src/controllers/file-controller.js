import FileService from "../services/file-service.js";
import fs from "fs";
const create = async (req, res, next) => {
  try {
    const result = await FileService.create(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = file.path;
        console.log(filePath);
        // Logika untuk menghapus file di sini
        fs.unlinkSync(filePath);
      });
    }
    next(error);
  }
};

const download = async (req, res, next) => {
  try {
    const result = await FileService.downlaodfile(req);
    const { filePath, fileName } = result;
    res.download(filePath, fileName);
  } catch (error) {
    next(error);
  }
};

export { create, download };
