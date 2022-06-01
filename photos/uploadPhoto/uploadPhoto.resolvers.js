import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtag(caption);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtag: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
