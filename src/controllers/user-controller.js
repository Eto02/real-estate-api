import userSevice from "../services/user-service.js";
const getUsers = async (req, res, next) => {
  try {
    const result = await userSevice.getUsers(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await userSevice.getUser(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await userSevice.updateUser(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userSevice.deleteUser(req);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const savePost = async (req, res, next) => {
  try {
    const result = await userSevice.savePost(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const profilePost = async (req, res, next) => {
  try {
    const result = await userSevice.profilePost(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getNotificationsNumber = async (req, res, next) => {
  try {
    const result = await userSevice.getNotificationsNumber(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePost,
  getNotificationsNumber,
};
