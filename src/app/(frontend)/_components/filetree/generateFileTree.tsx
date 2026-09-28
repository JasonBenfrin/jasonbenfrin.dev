import Link from "next/link";
import { CollapsibleFolder } from "./collapsibleFolder";
import { File, Folder, isAFile, SpecialFolderTypes } from "./types";
import getBlogYearsTree from "./blogYearsTree";

interface IFile {
  url: string,
  i: number,
  text: string,
  isLast: boolean,
}
function FileComponent({ url, i, text, isLast }: IFile) {
  return <Link
    href={url}
    className="nest-file"
    style={{ "--iteration": i } as React.CSSProperties}
    data-prefix={"│ ".repeat(i) + (isLast ? "└─" : "├─")}
  >
    <span className="flex overflow-x-hidden">
      <span>📄 </span>
      <span className="truncate pl-1"> {text}</span>
      <span>.md</span>
    </span>
  </Link>
}

export async function generateFileTree(dir: Folder<SpecialFolderTypes | undefined>, iteration: number = 0) {
  const blogs = await getBlogYearsTree()
  return <ul className="filetree flex flex-col pl-2">
    {(async () => {
      switch (dir.type) {
        case SpecialFolderTypes.BLOGS:
          return mapTreeToJSX([...blogs, ...dir.files!], iteration)
        default:
          return mapTreeToJSX(dir.files!, iteration)
      }
    })()}
  </ul>
}

function mapTreeToJSX(files: (File | Folder<SpecialFolderTypes | undefined>)[], iteration: number) {
  return files.map((v, i, arr) => {
    const isLast = arr.length - 1 === i
    if (isAFile(v)) {
      return <FileComponent key={i} i={iteration} url={v.url} isLast={isLast} text={v.text} />
    } else {
      return <CollapsibleFolder key={i} i={iteration} isLast={isLast} f={v}>
        {generateFileTree(v, isLast ? 0 : iteration + 1)}
      </CollapsibleFolder>
    }
  })
}