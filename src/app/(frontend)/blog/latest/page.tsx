import moment from "moment";
import { BlogItem } from "../../_components/blog";
import { BlogModel } from "@/app/(backend)/mongoose";
import { cacheLife, cacheTag } from "next/cache";

async function fetchLatestBlogs(count: number) {
  "use cache"
  cacheLife("days")
  cacheTag("total-blogs")

  const query = BlogModel.find().sort({ date: -1 }).limit(count)
  const blogs = await query.exec()
  return blogs.map(blog => {
    return {
      title: blog.title,
      abstract: blog.abstract,
      date: blog.date,
      tags: blog.tags,
      url: blog.url,
    }
  })
}

export default async function BlogLatestPage() {
  return <div className="border-2 flex-1 relative">
    <h1 className="absolute top-0 left-1 -translate-y-1/2 bg-surface px-1 font-bold text-primary">latest.md</h1>
    <div className="flex flex-col gap-3.5 h-full overflow-scroll p-2">
      {
        (await fetchLatestBlogs(20)).map((blog, i) => {
          return <BlogItem
            key={i}
            title={blog.title}
            abstract={blog.abstract}
            date={blog.date.valueOf()}
            tags={blog.tags?.map(v => ({ tagName: v, tagId: v }))}
            url={`/blog/${moment(blog.date).year()}/${blog.url}/`}
          />
        })
      }
    </div>
  </div>
}