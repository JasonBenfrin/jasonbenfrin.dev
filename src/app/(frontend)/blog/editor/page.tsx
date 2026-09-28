"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import EditorMenuBar from "./menubar";
import "highlight.js/styles/vs-dark.css"
import { editorExtensions } from "./extensions";
import { Suspense, useRef } from "react";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    label: {
      setFilename: () => ReturnType,
      toggleFilename: () => ReturnType
    };
  }
}

export default function BlogEditorPage() {
  return <Suspense>
    <Editor/>
  </Suspense>
}

function Editor() {
  const editor = useEditor({
    extensions: editorExtensions,
    immediatelyRender: false,
  })

  const titleInput = useRef<HTMLInputElement | null>(null)

  return <div
    className="border-2 flex-1 relative flex flex-col"
  >
    <input placeholder="Title" ref={titleInput} className="field-sizing-content absolute top-0 left-1 z-10 -translate-y-1/2 bg-surface px-1 font-bold text-primary" />
    <EditorContent editor={editor} spellCheck="false" className="flex-1 w-full *:p-2 flex flex-col *:flex-1 overflow-y-scroll editor" />
    <EditorMenuBar editor={editor!} titleInput={titleInput}/>
  </div>
}