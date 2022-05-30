import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({ take: 5, skip: 5 * (page - 1) });

      return { ok: true, followers };
    },
  },
};
