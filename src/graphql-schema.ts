import { buildSchema, GraphQLSchema } from "graphql";
import { userServiceSchemaType, userServiceSchemaQuery, userServiceSchemaMutation } from "./services/user-service/user-service-schema";

/**
 * @constant schema
 * Contains every schema that used in the application, the GraphQL body string is passed by template literals 
 */
const schema: string = `
    # Types scope
    ${userServiceSchemaType}
    type Query {
        # Query scope
        ${userServiceSchemaQuery}
    }
    type Mutation {
        # Mutation scope
        ${userServiceSchemaMutation}
    }
`;

const graphqlSchema: GraphQLSchema = buildSchema(schema);

export default graphqlSchema;
