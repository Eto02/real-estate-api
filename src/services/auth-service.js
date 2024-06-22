import bcrypt from "bcrypt";
import { prisma } from "../application/database.js";
import { registerValidation } from "../validation/auth-validataion.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const register = async (req) => {
  const body = await validate(registerValidation, req.body);
  const { username, email, password } = body;

  const isExists = await checkUserExists(username, email);
  if (isExists) throw new ResponseError(401, "Username or email already exist");

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPass,
    },
  });
  return newUser;
};

const login = async (req) => {
  console.log("login route works!");
};

const logout = async (req) => {
  console.log("login route works!");
};

const checkUserExists = async (username = "", email = "") => {
  const user = await prisma.user.findMany({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });
  if (user.length !== 0) return true;
  return false;
};

export default { login, register, logout };
