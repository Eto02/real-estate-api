import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime-types";

const uploadPath = process.env.UPLOAD_PATH;

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const serveStaticOnlyImagesAndVideos = (req, res, next) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "video/mp4",
    "video/quicktime",
  ];

  const requestedFile = path.join(uploadPath, req.url);
  const fileMimeType = mime.lookup(requestedFile);
  if (!allowedMimeTypes.includes(fileMimeType)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

export { upload, serveStaticOnlyImagesAndVideos };
