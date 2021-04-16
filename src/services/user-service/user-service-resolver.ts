import User from "../../types/user-type";

/**
 * @class UserService
 * Handles user related methods, CRUD operations, uses a MOCK variable(users) instead of database
 * GraphQL uses this class as a resolver
 */
class UserService {
    users: User[] = [{
        name: "Ágota",
        id: "000",
        favColor: "lime"
    },
    {
        name: "Mariann",
        id: "001",
        favColor: "cyan"
    },
    {
        name: "Dóri",
        id: "002",
        favColor: "cyan"
    },
    {
        name: "Ildi",
        id: "003",
        favColor: "lime"
    }];

    /**
     * @method getUsers
     * Return the users in an array
     * GraphQL Query
     */
    getUsers(): User[] {
        return this.users;
    }

    /**
     * @method getUsersByColor
     * Search for the users by the given color, and returns them
     * GraphQL Query
     */
    getUsersByColor({ color }: any): User[] {
        return this.users.filter(user => user.favColor == color);
    }

    /**
     * @method createUser
     * Creates a user, if the user's name already exsits the function will return error
     * GraphQL Mutation
     */
    createUser({ name, favColor }: any): string {

        let user: User = { 
            name: name,
            favColor: favColor,
            id: (this.users.length + 1).toString()
        }

        if (!this.users.find(userFromUsers => userFromUsers.name == name)) {
            this.users.push(user);
            return "ok"
        } else {
            return "error"
        }

    }

};

export { UserService };
