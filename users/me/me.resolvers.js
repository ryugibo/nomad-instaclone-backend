import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) => {
      console.log(loggedInUser);
      return client.user.findUnique({ where: { id: loggedInUser.id } });
    }),
  },
};
