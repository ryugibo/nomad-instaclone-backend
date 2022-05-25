import {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
  makeExecutableSchema,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
const resolvers = mergeResolvers(loadedResolvers);

const scheme = makeExecutableSchema({ typeDefs, resolvers });
export default scheme;
