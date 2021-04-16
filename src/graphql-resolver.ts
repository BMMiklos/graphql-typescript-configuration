import { UserService } from "./services/user-service/user-service-resolver";

/**
 * @constant graphqlResolver
 * Contains all the resolvers throught the program in an object
 */
const graphqlResolver = {
   userService: new UserService()
};

export default graphqlResolver;
