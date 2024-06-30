import MessageService from "../services/message-service.js";
const gets = async (req, res, next) => {
  try {
    const result = await MessageService.gets(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await MessageService.get(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const result = await MessageService.create(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const result = await MessageService.put(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req, res, next) => {
  try {
    const result = await MessageService.deleteData(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { gets, get, create, put, deleteData };
