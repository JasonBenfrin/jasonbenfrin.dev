"use client";

import { useState } from "react"
import { Folder, SpecialFolderTypes } from "./types";

interface ICollapsibleFolder {
  i: number,
  isLast: boolean,
  f: Folder<SpecialFolderTypes | undefined>,
  children: React.ReactNode
}
export function CollapsibleFolder({ i, isLast, f, children }: ICollapsibleFolder) {
  const [collapsed, setCollapsed] = useState<boolean>(true)

  return <li>
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="nest-file flex overflow-x-hidden"
      style={{ "--iteration": i } as React.CSSProperties}
      data-prefix={"│ ".repeat(i) + (isLast ? "└─" : "├─")}
    >
      <span>{collapsed ? "📁" : "📂"}</span>
      <span className="truncate pl-1"> {f.text}</span>
      <span>/</span>
    </button>
    <span className={collapsed ? "hidden" : "block"}>{children}</span>
  </li>
}