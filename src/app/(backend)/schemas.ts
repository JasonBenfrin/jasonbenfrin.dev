import { Schema } from "mongoose";

export const BlogPostSchema = new Schema({
  title: { type: String, required: true, },
  url: { type: String, required: true, },
  abstract: { type: String, required: true, },
  body: { type: String, required: true, transform: (v: string) => JSON.parse(v) },
  date: { type: Date, required: true, index: -1, transform: (v: Date) => v.valueOf() },
  tags: { type: [String], required: false, },
  isPinned: { type: Boolean, required: false, },
})