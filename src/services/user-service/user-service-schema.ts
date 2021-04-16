/**
 * @file user-service-schema.ts
 * Contains GraphQL schemas related to only one entity, in this case UserService
 */

/**
 * @constant userServiceSchemaType
 * Contains UserService related GraphQL types
 */
const userServiceSchemaType: string = `

    # UserService class used as a Query and Mutation Type
    type UserService {
        getUsers: [User]
        getUsersByColor(color: String!): [User]
        createUser(name: String, favColor: String): String
    }

    # User GraphQL type
    type User {
        name: String
        id: String
        favColor: String
    }
`;

/**
 * @constant userServiceSchemaQuery
 * Contains UserService related GraphQL queries, in this case the UserService object being used as a query
 * C(R)UD
 */
const userServiceSchemaQuery: string = `
    userService: UserService
`;

/**
 * @constant userServiceSchemaMutation
 * It is using the same UserService instance like above, but it's only for to use UserServices createUser method
 * (C)R(U)(D)
 */
const userServiceSchemaMutation: string = `
    userService: UserService
`;

export { userServiceSchemaType, userServiceSchemaQuery, userServiceSchemaMutation };
