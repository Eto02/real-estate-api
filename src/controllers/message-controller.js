import MessageService from "../services/message-service.js";
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

export { create };
