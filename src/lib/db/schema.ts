import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const $research = pgTable('research', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  imageUrl: text('image_url'),
  userId: text('user_id').notNull(),
  editorState: text('editor_state'),
}) 

export type ResearchType = typeof $research.$inferSelect;

export const $chat = pgTable('chat', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  noteBookId: integer('note_book_id').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type ChatType = typeof $chat.$inferSelect;
