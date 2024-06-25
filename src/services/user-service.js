import bcrypt from "bcrypt";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { updateUserValidation } from "../validation/user-validation.js";
const getUsers = async (req) => {
  const users = await prisma.user.findMany();
  return users;
};

const getUser = async (req) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const userId = req.user;

  if (id !== userId) throw new ResponseError(403, "Not Authorized!");
  const deleted = await prisma.user.delete({
    where: { id },
  });
  return deleted;
};

export default { getUsers, getUser, updateUser, deleteUser };
