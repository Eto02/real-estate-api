import userSevice from "../services/user-service.js";
const getUsers = async (req, res, next) => {
  try {
    const result = await userSevice.getUsers(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await userSevice.getUser(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await userSevice.updateUser(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userSevice.deleteUser(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser, updateUser, deleteUser };
