import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"

import { userRoles } from './userRoles';

// Needs enum?
export const roles = pg.pgTable("roles", {
  id:pg.serial('id').notNull().primaryKey(),
  rolename:pg.varchar('rolename', { length: 255 }).notNull().unique(),
})

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const rolesSchema = createInsertSchema(roles);
export type RolesSchema = z.infer<typeof rolesSchema>;