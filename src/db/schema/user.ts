import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userRoles } from './userRoles';
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"

export const user = pg.pgTable("user", {
  id:pg.serial('id').notNull().primaryKey(),
  userid:pg.uuid('userid').notNull().unique(),
  name:pg.varchar('name', { length: 255 }).notNull(),
  nickname:pg.varchar('nickname', { length: 255 }),
  email:pg.varchar('email', { length: 255 }).notNull().unique(),
  mobilenumber:pg.text('mobilenumber'),
  image:pg.text('image'),
  location:pg.varchar('location', { length: 255 }),
})

export const userRelations = relations(user, ({ many }) => ({
  userRoles: many(userRoles),
}));

//TODO: GET ALL CONSTRAINTS FOR ALL VALUES
export const userSchema = createInsertSchema(user, {
  id: (schema) => schema.positive(), 
  userid: z.string().uuid({message: 'Not a valid uuid'}),
  name: (schema) => schema.min(1),
  nickname: (schema) => schema.min(1),
  email: (schema) => schema.email({message: 'Not a valid email address'}),
  mobilenumber: z.string().min(11).max(11),
  image: (schema) => schema.min(1),
  location: (schema) => schema.min(1),
});
export type UserSchema = z.infer<typeof userSchema>;

/** possibly e.g
{
  "userid": "uuid1",
  "name": "Bob Doe",
  "nickname": "BobbyD",
  "email": "BobDoe@bob.com",
  "mobilenumber": "07918371289",
  "image": "www.image.png",
  "location": "Earth probably"
}
 */