import { db, EXAMPLETEST } from '@/db/db.js';


const resolver = {
    Query: {
        me: () => 'Hello World'
    }
}

export const resolvers = [resolver]