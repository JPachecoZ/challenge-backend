import { readFile } from 'node:fs/promises';

export const typeDefs = await readFile('src/graphql/schema/schema.graphql', 'utf8');