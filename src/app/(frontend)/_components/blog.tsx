import moment from "moment"
import Link from "next/link"

// Do we even need this?
type TagDisplay = {
  tagName: string,
  tagId: string,
}

interface IBlogItem {
  title: string,
  abstract: string,
  date: number,
  tags?: TagDisplay[],
  url: string,
}
export function BlogItem({ title, abstract, date, tags, url }: IBlogItem) {
  return <div className="p-2 pb-3 relative flex flex-col justify-between border-2 rounded-[1ch]">
    <Link href={url} className="pb-1 font-bold">
      <span className="hover:underline">{title}</span>
    </Link>
    <p>
      {abstract}
    </p>
    <span className="absolute right-2 top-0 -translate-y-1/2 px-1 bg-surface text-on-surface-variant">{moment(date).format("DD MMM YYYY")}</span>
    <div className="absolute right-2 bottom-0 translate-y-1/2 px-1 bg-surface flex gap-1 items-center">
      {
        tags?.map((v, i) => {
          return <Link
            key={i}
            href={`/blog/tag/${v.tagId}`}
            className="tag px-1 py-0.5"
          >
            {v.tagName}
          </Link>
        })
      }
    </div>
  </div>
}