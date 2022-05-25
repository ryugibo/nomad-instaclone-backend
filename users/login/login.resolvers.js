import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return { ok: false, error: "User not found" };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = await JWT.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        token,
        ok: true,
      };
    },
  },
};
