import bcrypt from "bcrypt";
import client from "../../client";

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
        await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
