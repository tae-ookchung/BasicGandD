import { db } from '../db_server/index.js';
import { users } from '../db_server/schema/schema.js';
import { eq } from 'drizzle-orm';

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await db.select().from(users);
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    },
  },
  Mutation: {
    createUser: async (
      _: any, 
      { name, age, isweeb }: { name: string; age: number; isweeb: boolean }
    ) => {
      const newUser = await db.insert(users).values({ name, age, isweeb } as any).returning();
      return newUser[0];
    },
  },
};