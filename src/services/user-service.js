import bcrypt from "bcrypt";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
const getUsers = async (req) => {
  const users = await prisma.user.findMany();
  return users;
};

const getUser = async (req) => {
  const id = await validate(getUserValidation, req.params.id);
  const user = await prisma.user.findMany({
    where: { id },
  });
  return user;
};

const updateUser = async (req) => {
  const body = await validate(updateUserValidation, req.body);
  const { password, avatar, ...input } = body;
  const id = req.params.id;
  const userId = req.user;
  let updatedPass = null;
  if (id !== userId) throw new ResponseError(403, "Not Authorized!");
  if (password) updatedPass = await bcrypt.hash(password, 10);
  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...input,
      ...(updatedPass && { password: updatedPass }),
      ...(avatar && { avatar }),
    },
  });
  const { password: userPass, ...rest } = updated;
  return rest;
};

const deleteUser = async (req) => {
  const id = await validate(getUserValidation, req.params.id);
  const userId = req.user;

  if (id !== userId) throw new ResponseError(403, "Not Authorized!");
  const deleted = await prisma.user.delete({
    where: { id },
  });
  return deleted;
};

const savePost = async (req) => {
  const id = await validate(getUserValidation, req.body.postId);
  const userId = req.user;

  let savedPost = await prisma.savedPost.findUnique({
    where: {
      userId_postId: { userId, postId: id },
    },
  });
  if (savedPost) {
    await prisma.savedPost.delete({
      where: {
        id: savedPost.id,
      },
    });
  } else {
    savedPost = await prisma.savedPost.create({
      data: { userId, postId: id },
    });
  }

  return savedPost;
};

const profilePost = async (req) => {
  const userId = req.user;
  const post = await prisma.post.findMany({
    where: { userId },
  });
  const saved = await prisma.savedPost.findMany({
    where: { userId },
    include: {
      post: true,
    },
  });
  const savedPost = saved.map((item) => item.post);
  return { post, savedPost };
};

const getPosts = async (req) => {
  const userId = req.user;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;

  const data = await prisma.post.findMany({
    where: { userId },
    skip: skip,
    take: limit,
  });

  const totalCount = await prisma.post.count({
    where: { userId },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
    },
  };
};

const getSavedPosts = async (req) => {
  const userId = req.user;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const saved = await prisma.savedPost.findMany({
    where: { userId },
    include: {
      post: true,
    },
    skip: skip,
    take: limit,
  });

  const data = saved.map((item) => item.post);

  const totalCount = await prisma.savedPost.count({
    where: { userId },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
    },
  };
};

const getNotificationsNumber = async (req) => {
  const userId = req.user;
  const number = await prisma.chat.count({
    where: {
      userIDs: { hasSome: [userId] },
      NOT: {
        seenBy: { hasSome: [userId] },
      },
    },
  });

  return number;
};

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePost,
  getNotificationsNumber,
  getPosts,
  getSavedPosts,
};
