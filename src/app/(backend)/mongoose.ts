import mongoose, { InferSchemaType } from "mongoose"
import { BlogPostSchema } from "./schemas"

export const db = await mongoose.connect(process.env.MONGO_URL!)
if (!db.modelNames().includes("Blog")) db.model("Blog", BlogPostSchema)

export const BlogModel = db.model<InferSchemaType<typeof BlogPostSchema>>("Blog")