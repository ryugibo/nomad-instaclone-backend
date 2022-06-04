import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(async (_, __, { loggedInUser }) => {
      return await client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { user: { id: loggedInUser.id } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    }),
  },
};
