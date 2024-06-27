import PostSevice from "../services/post-service.js";
const gets = async (req, res, next) => {
  try {
    const result = await PostSevice.gets(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await PostSevice.get(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const result = await PostSevice.create(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const result = await PostSevice.put(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req, res, next) => {
  try {
    const result = await PostSevice.deleteData(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { gets, get, create, put, deleteData };
