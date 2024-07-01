import { prisma } from "../application/database.js";

const create = async (req) => {
  const userId = req.user;
  const params = req.params;
  const body = req.body;

  const chat = await prisma.chat.findUnique({
    where: {
      id: params.chatId,
      userIDs: {
        hasSome: [userId],
      },
    },
  });

  if (!chat) throw new ResponseError(404, "Chat not found!");
  const message = await prisma.message.create({
    data: {
      text: body.text,
      chatId: params.chatId,
      userId: userId,
    },
  });
  await prisma.chat.update({
    where: {
      id: params.chatId,
    },
    data: {
      seenBy: [userId],
      lastMessage: body.text,
    },
  });
  return message;
};

export default { create };
