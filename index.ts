import express = require("express");
import { graphqlHTTP } from "express-graphql";

import graphqlSchema from "./src/graphql-schema";
import graphqlResolver from "./src/graphql-resolver";

let app = express();

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
