import moment from "moment"
import Link from "next/link"

export default function BlogPage() {
  return <div className="w-full gap-1 flex">
    <div className="flex-1 relative border-2 pt-1">
      <h1 className="absolute top-0 left-1 -translate-y-1/2 bg-surface px-1 font-bold"># Pinned</h1>
      <div className="flex flex-col gap-3.5 h-full overflow-scroll p-2">
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details nasdasdfasdfasdfasdfasd asdfa as asd  s ot guaranteed"
          date={moment().valueOf()}
          tags={[
            {
              tagId: "programming",
              tagName: "Programming"
            },
            {
              tagId: "study",
              tagName: "Study"
            },
          ]}
        />
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog   asdfasdf  asfd asd a  details not guaranteed"
          date={moment().valueOf()}
          tags={[
            {
              tagId: "programming",
              tagName: "Programming"
            },
            {
              tagId: "study",
              tagName: "Study"
            },
          ]}
        />
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
          tags={[
            {
              tagId: "programming",
              tagName: "Programming"
            },
            {
              tagId: "study",
              tagName: "Study"
            },
          ]}
        />
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
          tags={[
            {
              tagId: "programming",
              tagName: "Programming"
            },
            {
              tagId: "study",
              tagName: "Study"
            },
          ]}
        />
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
        />
        <BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
        /><BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
        /><BlogItem
          title="Test title asdfst"
          abstract="This is a test blog details not guaranteed"
          date={moment().valueOf()}
        />
      </div>
    </div>
  </div>
}

type TagDisplay = {
  tagName: string,
  tagId: string,
}

interface IBlogItem {
  title: string,
  abstract: string,
  date: number,
  tags?: TagDisplay[],
}
function BlogItem({ title, abstract, date, tags }: IBlogItem) {
  return <div className="p-1.5 pb-3 relative flex flex-col justify-between border-2 rounded-lg">
    <h2 className="pb-1 font-bold">
      <span className="hover:underline">{title}</span>
    </h2>
    <p>
      {abstract}
    </p>
    <span className="absolute right-2 top-0 -translate-y-1/2 px-1 bg-surface text-on-surface-variant">{moment(date).format("DD MMM YYYY")}</span>
    <div className="absolute right-2 bottom-0 translate-y-1/2 px-1 bg-surface flex gap-0.5 items-center">
      {
        tags?.map((v, i) => {
          return <Link
            key={i}
            href={`/blog/tag/${v.tagId}`}
            className="inverse px-1 py-0.5"
          >
            {v.tagName}
          </Link>
        })
      }
    </div>
  </div>
}