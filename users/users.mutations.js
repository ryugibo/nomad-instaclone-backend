import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        const uglyPassword = await bcrypt.hash(password, 10);
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
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
