import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates: { roomId } }, { id }) => {
          return roomId === id;
        }
      ),
    },
  },
};
