import { prisma } from "../application/database.js";

const gets = async (req) => {
  const userId = req.user;
  const chats = await prisma.chat.findMany({
    where: {
      userIDs: {
        hasSome: [userId],
      },
    },
  });
  for (const chat of chats) {
    const receiverId = chat.userIDs.find((id) => id !== userId);
    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });
    chat.receiver = receiver;
  }

  return chats;
};

const get = async (req) => {
  const userId = req.user;
  const params = req.params;
  await prisma.chat.update({
    where: {
      id: params.id,
    },
    data: {
      seenBy: {
        set: [userId],
      },
    },
  });
  const data = await prisma.chat.findUnique({
    where: {
      id: params.id,
      userIDs: {
        hasSome: [userId],
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return data;
};

const create = async (req) => {
  const userId = req.user;
  const body = req.body;
  const newChat = await prisma.chat.create({
    data: {
      userIDs: [userId, body.receiverId],
    },
  });
  return newChat;
};

const put = async (req) => {
  const userId = req.user;
  const params = req.params;
  await prisma.chat.update({
    where: {
      id: params.id,
      userIDs: {
        hasSome: [userId],
      },
    },
    data: {
      seenBy: {
        set: [userId],
      },
    },
  });
  return true;
};

const deleteData = async (req) => {
  return true;
};

export default { gets, get, create, put, deleteData };
