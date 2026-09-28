"use server";

import { BlogModel } from "@/app/(backend)/mongoose";
import moment from "moment";
import { cacheLife, cacheTag } from "next/cache";
import { File, Folder } from "./types";

export default async function getBlogYearsTree(): Promise<Folder<undefined>[]> {
  "use cache"
  cacheLife("days")
  cacheTag("total-blogs")

  const allBlogsQuery = BlogModel.find().select("title url date").sort({ date: -1 })

  const posts = await allBlogsQuery.exec()

  const blogYearsData: Folder<undefined>[] = []

  posts.forEach(post => {
    const year = moment(post.date).year().toString()
    const existing = blogYearsData.find(v => v.text === year)
    const file: File = {
      text: post.title,
      url: `/blog/${year}/${post.url}/`
    }

    if (existing) {
      existing.files.push(file)
    } else {
      blogYearsData.push({
        text: year,
        files: [file]
      })
    }
  })

  return blogYearsData
}