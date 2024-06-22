import authSrvice from "../services/auth-service.js";
const login = async (req, res, next) => {
  try {
    console.log("login route works!");
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await authSrvice.register(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    console.log("logout route works!");
  } catch (error) {
    next(error);
  }
};
export { login, register, logout };
