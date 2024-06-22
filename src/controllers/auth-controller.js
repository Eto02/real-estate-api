import authSrvice from "../services/auth-service.js";
const login = async (req, res, next) => {
  try {
    const result = await authSrvice.login(req);
    res.status(200).json({
      data: result,
    });
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

export { login, register };
