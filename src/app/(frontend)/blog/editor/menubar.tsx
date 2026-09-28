import type { Editor } from "@tiptap/core"

interface IEditorMenuBar {
  editor: Editor
}
export default function EditorMenuBar({ editor }: IEditorMenuBar) {
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
  </div>
}