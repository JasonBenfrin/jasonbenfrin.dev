"use server"

import { generateFileTree } from "./filetree/generateFileTree";
import { Folder, SpecialFolderTypes } from "./filetree/types";

const directory: Folder<SpecialFolderTypes | undefined> = {
  text: "",
  files: [
    {
      text: "blog",
      type: SpecialFolderTypes.BLOGS,
      files: [
        {
          text: "pinned",
          url: "/blog/pinned/"
        },
        {
          text: "latest",
          url: "/blog/latest/"
        },
      ]
    },
    {
      text: "about",
      url: "/",
    }
  ]
}

export default async function FileTree() {
  return <div className="flex-1 border-2 p-2 overflow-x-hidden overflow-y-auto">
    <h1 className="font-bold text-primary">/home/jason-benfrin/</h1>
    {await generateFileTree(directory)}
  </div>
}