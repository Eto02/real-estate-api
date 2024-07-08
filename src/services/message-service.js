import { prisma } from "../application/database.js";
import {
  createMessageValidation,
  getMesasgeValidation,
} from "../validation/message-validation.js";
import { validate } from "../validation/validation.js";

const create = async (req) => {
  const userId = req.user;
  const chatId = await validate(getMesasgeValidation, req.params.chatId);
  const body = await validate(createMessageValidation, req.body);

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
      userIDs: {
        hasSome: [userId],
      },
    },
  });

  if (!chat) throw new ResponseError(404, "Chat not found!");
  const message = await prisma.message.create({
    data: {
      text: body.text,
      chatId: chatId,
      userId: userId,
    },
  });
  await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      seenBy: [userId],
      lastMessage: body.text,
    },
  });
  return message;
};

export default { create };
