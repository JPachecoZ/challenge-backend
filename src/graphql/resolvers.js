import { GraphQLError } from "graphql"
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller.js"

export const resolvers = {
    Query: {
        user: (_root, { id }) => getUser(id),
        users: () => getUsers()
    },

    Mutation: {
        createUser: (_root, { name, email }, { auth }) => {
                if (!isAuthenticated(auth)){
                    throw unauthorizedError("Missing Authentication")
                }
                return createUser({name, email})
            },
            
        updateUser: async(_root, { id, name, email }, { auth }) => {
                console.log('attempting to update user...')
                if (!isAuthenticated(auth)){
                    throw unauthorizedError("Missing Authentication")
                }
                const user = await updateUser({id, name, email})
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