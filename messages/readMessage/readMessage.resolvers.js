import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = client.message.findFirst({
        where: {
          id,
          user: { id: { not: loggedInUser.id } },
          room: { users: { some: { id: loggedInUser.id } } },
        },
      });
      if (!meesage) {
        return { ok: false, error: "Message is not exist." };
      }
      await client.message.update({ where: { id }, data: { read: true } });
      return { ok: true };
    }),
  },
};
