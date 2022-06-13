import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "That user does not exist." };
      }
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({ take: 5, skip: 5 * (page - 1) });

      const totalFollowers = await client.user.count({
        where: { following: { some: { userName } } },
      });
      return {
        ok: true,
        totalPages: Math.ceil(totalFollowers / 5),
        followers,
      };
    },
  },
};
