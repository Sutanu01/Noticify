import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const noticeTable = pgTable("notices", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 80 }).notNull(),
  body: text().notNull(),
  orgId: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export type createNoticeType = typeof noticeTable.$inferInsert;
export type selectNoticeType = typeof noticeTable.$inferSelect;
