import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth-validataion.js";
import { validate } from "../validation/validation.js";

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
  const body = await validate(loginValidation, req.body);
  const { username, password } = body;

  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) throw new ResponseError(401, "Username or password wrong");
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) throw new ResponseError(401, "Username or password wrong");
  const expires = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: false,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: expires,
    }
  );
  const { password: userPass, ...userInfo } = user;
  return {
    token,
    userInfo,
    expires,
  };
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

export default { login, register, checkUserExists };
