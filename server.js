require("dotenv").config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNDgxMjg4fQ.K0NVOWb-h3PW087qW-_nShxyG2uWsWpUpoxtf5fVQLc",
  },
});

const PORT = process.env.PORT;
server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
