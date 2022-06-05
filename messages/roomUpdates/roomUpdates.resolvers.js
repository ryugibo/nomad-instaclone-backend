import { withFilter } from "apollo-server-express";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error("You shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates: { roomId } }, { id }, { loggedInUser }) => {
            if (roomId !== id) {
              return false;
            }
            const room = await client.room.findFirst({
              where: {
                id,
                users: { some: { id: loggedInUser.id } },
              },
              select: { id: true },
            });
            if (!room) {
              return false;
            }
            return true;
          }
        )(root, args, context, info);
      },
    },
  },
};
