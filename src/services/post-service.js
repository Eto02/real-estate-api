import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const gets = async (req) => {
  const posts = await prisma.post.findMany();
  return posts;
};

const get = async (req) => {
  const id = req.params.id;
  const data = await prisma.post.findMany({
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
  return data;
};

const create = async (req) => {
  const body = req.body;
  const userId = req.user;
  const data = await prisma.post.create({
    data: { ...body.data, userId, postDetail: { create: body.detail } },
  });
  return data;
};

const put = async (req) => {
  return true;
};

const deleteData = async (req) => {
  const id = req.params.id;
  const userId = req.user;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (post.userId !== userId) throw new ResponseError(403, "Not Authorized!");

  const deleted = await prisma.post.delete({
    where: { id },
  });
  return deleted;
};

export default { gets, get, create, put, deleteData };
