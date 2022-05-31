import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          // parse caption
          // get or create hashtags
        }
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
