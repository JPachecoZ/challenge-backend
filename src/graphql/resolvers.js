import { GraphQLError } from "graphql"
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller.js"

export const resolvers = {
    Query: {
        user: (_root, { id }) => getUser(id),
        users: () => getUsers()
    },

    Mutation: {
        createUser: (_root, { input }, { auth }) => {
                if (!isAuthenticated(auth)){
                    throw unauthorizedError("Missing Authentication")
                }
                return createUser(input)
            },
            
        updateUser: async(_root, { input }, { auth }) => {
                if (!isAuthenticated(auth)){
                    throw unauthorizedError("Missing Authentication")
                }
                const user = await updateUser(input)
                if (!user) {
                    throw new Error("User not found")
                }
                return user
            },

        deleteUser: async(_root, { id }, { auth }) => {
            if (!isAuthenticated(auth)){
                throw unauthorizedError("Missing Authentication")
            }
            const user = await deleteUser(id)
            if (!user) {
                throw new Error("User not found")
            }
            return user
        },
    }
}

function unauthorizedError(message){
    return new GraphQLError(message, { extensions: { code: "UNAUTHORIZED" }})
}

function isAuthenticated(auth){
    return auth && auth.sub && (auth.exp > (Date.now() / 1000))
}