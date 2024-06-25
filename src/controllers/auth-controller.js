import authSrvice from "../services/auth-service.js";
const login = async (req, res, next) => {
  try {
    const result = await authSrvice.login(req);
    const { token, userInfo, expires } = result;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: expires,
      })
      .status(200)
      .json({
        data: userInfo,
      });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await authSrvice.register(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export { login, register };
