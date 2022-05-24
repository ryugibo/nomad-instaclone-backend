import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: { OR: [{ userName }, { email }] },
      });
      console.log(existingUser);
      // hash password
      // save and return the user
    },
  },
};
