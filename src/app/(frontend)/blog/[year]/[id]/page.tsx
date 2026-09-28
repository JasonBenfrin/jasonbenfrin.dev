import { BlogModel } from "@/app/(backend)/mongoose"
import moment from "moment"
import { renderToReactElement } from '@tiptap/static-renderer/pm/react'
import { viewExtensions } from "../../editor/extensions"
import "highlight.js/styles/vs-dark.css"
import CodeBlockView from "./codeblock"
import { cacheLife, cacheTag } from "next/cache"
import { Suspense } from "react"
import GiscusBlog from "./giscus"
import SuspenseFallback from "@/app/(frontend)/_components/suspenseFallback"

export default async function BlogItemViewPage(props: PageProps<'/blog/[year]/[id]'>) {
  return <Suspense fallback={<SuspenseFallback />}>
    <BlogView {...props} />
  </Suspense>
}

async function BlogView(props: PageProps<'/blog/[year]/[id]'>) {
  "use cache"
  cacheLife("days")

  const { id } = await props.params
  cacheTag(`blog-${id}`)

  const blogDataQuery = BlogModel.findOne({
    url: id,
  })

  const blog = await blogDataQuery.exec()
  return <div className="border-2 flex-1 relative flex flex-col">
    <p className="absolute top-0 right-1 -translate-y-1/2 bg-surface px-1 text-on-surface-variant">{moment(blog?.date).format("DD MMM YYYY")}</p>
    <h1 className="font-bold text-primary p-2 pb-1">{blog?.title}</h1>
    <div className="overflow-y-scroll editor p-2 pt-0">
      {renderToReactElement({
        extensions: viewExtensions,
        content: JSON.parse(blog!.body),
        options: {
          nodeMapping: {
            codeBlock: ({ node }) => <CodeBlockView codeLang={node.attrs.language} textContent={node.textContent} />
          }
        },
      })}
      <GiscusBlog />
    </div>
  </div>
}