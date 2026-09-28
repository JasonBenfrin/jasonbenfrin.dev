"use client"

import type { Editor } from "@tiptap/core"
import { RefObject, useRef, useState } from "react"

interface IEditorMenuBar {
  editor: Editor
  titleInput: RefObject<HTMLInputElement | null>
}
export default function EditorMenuBar({ editor, titleInput }: IEditorMenuBar) {
  const [isLoading, setIsLoading] = useState(false)
  const dialog = useRef<HTMLDialogElement | null>(null)
  const passInput = useRef<HTMLInputElement | null>(null)
  const abstractInput = useRef<HTMLTextAreaElement | null>(null)
  const tagsInput = useRef<HTMLTextAreaElement | null>(null)
  const [pass, setPass] = useState<string>("")
  const [abstract, setAbstract] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  return <div className="border-t-2 p-1 flex gap-1 flex-wrap">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      [<span className="font-bold">B</span>]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      [<span className="italic">i</span>]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      [<span className="line-through">s</span>]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleCode().run()}
    >
      [{"< >"}]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
    >
      [{">"}]
    </button>
    <button
      onClick={() => editor.chain().focus().unsetAllMarks().run()}
    >
      [Clear Marks]
    </button>
    <button
      onClick={() => editor.chain().focus().clearNodes().run()}
    >
      [Clear Nodes]
    </button>
    <button
      onClick={() => editor.chain().focus().setParagraph().run()}
    >
      [p]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      [h1]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      [h2]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    >
      [h3]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
    >
      [h4]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
    >
      [h5]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
    >
      [h6]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
    >
      [*]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
    >
      [1.]
    </button>
    <button
      onClick={() => editor.chain().focus().liftListItem("listItem").run()}
    >
      [lift]
    </button>
    <button
      onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
    >
      [sink]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
    >
      [```]
    </button>
    <button
      onClick={() => editor.chain().focus().toggleFilename().run()}
    >
      [file.ext]
    </button>
    <button
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
    >
      [{"<hr>"}]
    </button>
    <button
      onClick={() => editor.chain().focus().setHardBreak().run()}
    >
      [{"<br>"}]
    </button>
    <button
      onClick={() => editor.chain().focus().undo().run()}
    >
      [Undo]
    </button>
    <button
      onClick={() => editor.chain().focus().redo().run()}
    >
      [Redo]
    </button>
    {/* TODO: Link and Image needed */}
    <button
      className="text-red-500"
      onClick={() => console.log(editor.getJSON())}
    >
      [Debug]
    </button>
    <button
      disabled={isLoading}
      className="text-primary disabled:opacity-50 disabled:cursor-not-allowed!"
      onClick={() => {
        if (pass === "" || abstract === "" || !titleInput.current || titleInput.current.value === "") {
          setError("Set title, abstract and pass first")
          setIsLoading(false)
          setTimeout(() => {
            setError(null)
          }, 2_000)
          return
        }
        setIsLoading(true)
        fetch("/api/blog/", {
          method: "POST",
          headers: {
            "Authorization": pass
          },
          body: JSON.stringify({
            title: titleInput.current.value,
            abstract: abstract,
            body: editor.getJSON(),
            date: new Date().valueOf(),
            tags: tags.split(",").filter(v => v !== "")
          })
        })
          .then(async (v) => {
            setSuccess(`Posted with ID of ${(await v.json()).url}`)
            setIsLoading(false)
            setTimeout(() => {
              setSuccess(null)
            }, 2_000)
          })
          .catch(err => {
            setError(err instanceof Error ? err.message : String(err))
            setIsLoading(false)
            setTimeout(() => {
              setError(null)
            }, 2_000)
          })
      }}
    >
      [POST]
    </button>
    <button className="text-primary" onClick={() => {
      if (!dialog.current) return
      dialog.current.showModal()
    }}>
      {"[->]"}
    </button>
    <dialog ref={dialog} className="w-full h-full max-w-none max-h-none bg-transparent focus:outline-0 backdrop:bg-black/30 open:flex justify-center items-center">
      <div className="bg-on-surface text-surface selection:text-on-surface! selection:bg-surface! p-2 relative">
        <div className="p-1 border-2 border-surface">
          <span>password:</span>
          <input type="password" className="border-b-2" ref={passInput} />
          <br />
          <br />
          <span>abstract:</span>
          <textarea className="w-full border-b-2" ref={abstractInput}></textarea>
          <br />
          <span>tags:</span>
          <textarea className="w-full border-b-2" ref={tagsInput}></textarea>
        </div>
        <button className="absolute top-1 right-1 bg-on-surface" onClick={() => {
          dialog.current?.close()
          setPass(passInput.current?.value ?? "")
          setAbstract(abstractInput.current?.value ?? "")
          setTags(tagsInput.current?.value ?? "")
        }}>
          [x]
        </button>
      </div>
    </dialog>
    {
      error &&
      <div className="absolute inset-0 flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    }
    {
      success &&
      <div className="absolute inset-0 flex justify-center items-center text-green-500">
        Success: {success}
      </div>
    }
  </div>
}