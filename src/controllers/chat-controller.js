import ChatService from "../services/chat-service.js";
const gets = async (req, res, next) => {
  try {
    const result = await ChatService.gets(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await ChatService.get(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const result = await ChatService.create(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const result = await ChatService.put(req);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export { gets, get, create, put };
