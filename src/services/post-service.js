import jwt from "jsonwebtoken";
import { promisify } from "util";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createPostValidation,
  getPostValidation,
} from "../validation/post-validation.js";
import { validate } from "../validation/validation.js";

const verifyAsync = promisify(jwt.verify);

const gets = async (req) => {
  const query = req.query;
  const page = parseInt(req.query.page) || 1; // Halaman yang diminta, default: 1
  const limit = parseInt(req.query.limit) || 5; // Jumlah item per halaman, default: 5

  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    where: {
      city: {
        contains: query.city || undefined,
      },
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        gte: parseInt(query.minPrice) || 0,
        lte: parseInt(query.maxPrice) || 10000,
      },
    },
    skip: skip,
    take: limit,
  });
  const totalCount = await prisma.user.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
    },
  };
};

const get = async (req) => {
  const id = await validate(getPostValidation, req.params.id);
  const data = await prisma.post.findUnique({
    where: { id },
    include: {
      postDetail: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  const token = req.cookies?.token;
  if (token) {
    try {
      const decoded = await verifyAsync(token, process.env.JWT_SECRET_KEY);
      const saved = await prisma.savedPost.findUnique({
        where: {
          userId_postId: { userId: decoded.id, postId: id },
        },
      });
      return { ...data, isSaved: saved ? true : false };
    } catch (err) {}
  }
  return { ...data, isSaved: false };
};

const create = async (req) => {
  const body = await validate(createPostValidation, req.body);
  const userId = req.user;
  const data = await prisma.post.create({
    data: { ...body.data, userId, postDetail: { create: body.detail } },
  });
  return data;
};

const deleteData = async (req) => {
  const id = await validate(getPostValidation, req.params.id);
  const userId = req.user;
  console.log("deleteData");
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (post?.userId !== userId) throw new ResponseError(403, "Not Authorized!");

  const deleted = await prisma.post.delete({
    where: { id },
  });
  return deleted;
};

export default { gets, get, create, deleteData };
