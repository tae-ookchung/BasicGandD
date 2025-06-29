import * as pg from "drizzle-orm/pg-core";
import { user } from "./user"
import { roles } from "./roles"
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"

export const userRoles = pg.pgTable("userroles", {
  userid: pg.uuid('userid')
    .notNull()
    .references(() => user.userid),
  rolesid: pg.integer('rolesid')
    .notNull()
    .references(() => roles.id),
},
  (table) => [
    pg.primaryKey({ 
      columns: [table.userid, table.rolesid] 
    })
  ]
)

// One to One relationship
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(user, { fields: [userRoles.userid], references: [user.userid] }),
  roles: one(roles, { fields: [userRoles.rolesid], references: [roles.id] })
}))

export const userRolesSchema = createInsertSchema(userRoles);
export type UserRolesSchema = z.infer<typeof userRolesSchema>;