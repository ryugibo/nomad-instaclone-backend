export default {
  User: {
    totalFollowing: (root) => root.following.length,
    totalFollowers: (root) => root.followers.length,
  },
};
