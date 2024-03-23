import { connection } from "../db/dbconnection.js";
import { generateId } from "../db/idgen.js";

const getUserTable = () => connection.table("user");

export async function getUser(id){
    return await getUserTable().where({id}).first();
}

export async function getUserByEmail(email){
    return await getUserTable().where('email', email).first();
}

export async function getUsers(){
    return await getUserTable();
}

export async function createUser({email, name, password}){
    const user = {
        id: generateId(),
        email,
        name,
    }
    const userWithEmail = await getUserTable().where('email', email).first();
    if (userWithEmail) {
        throw new Error('Email already exists');
    }

    await getUserTable().insert({...user, password: password || 'DEFAULT'});
    return user;
}

export async function updateUser({ id, email, name }){
    const user = {
        id,
        name,
        email,
    };
    await getUserTable().where({id}).update(user);
    return user;
}

export async function deleteUser(id){
    const user = await getUserTable().where({id}).first();
    if (!user) {
        throw new Error('User not found');
    }
    await getUserTable().where({id}).delete();
    return user;
}