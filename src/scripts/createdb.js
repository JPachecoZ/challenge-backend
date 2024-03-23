import { connection } from "../db/dbconnection.js";

const { schema } = connection;

await schema.dropTableIfExists("user");

await schema.createTable("user", table => {
    table.text("id").notNullable().primary();
    table.string("email").notNullable().unique();
    table.string("name");
    table.string("password").notNullable();
});

process.exit()