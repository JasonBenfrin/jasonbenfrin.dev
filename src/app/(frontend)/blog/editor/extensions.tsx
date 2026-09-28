import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { mergeAttributes, Node } from "@tiptap/core";
import { all, createLowlight } from "lowlight";

const FileNameNode = Node.create({
  name: "filename",
  content: 'text*',

  marks: '',

  group: 'block',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [{ tag: 'label', }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['label', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "filename" }), 0]
  },

  addCommands() {
    return {
      setFilename:
        () =>
          ({ commands }) => {
            return commands.setNode(this.name)
          }
      ,
      toggleFilename:
        () =>
          ({ commands }) => {
            return commands.toggleNode(this.name, "paragraph")
          }
    }
  },
})

export const lowlight = createLowlight(all)

const commonExtensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  FileNameNode,
]

export const editorExtensions = [
  ...commonExtensions,
  CodeBlockLowlight
    .configure({
      lowlight,
      HTMLAttributes: { class: "codeblock" },
      tabSize: 2,
      enableTabIndentation: true,
      defaultLanguage: "plaintext",
    })
  ,
]

export const viewExtensions = [
  ...commonExtensions,
  CodeBlockLowlight
    .configure({
      lowlight: lowlight,
      HTMLAttributes: { class: "codeblock" },
      tabSize: 2,
      enableTabIndentation: true,
      defaultLanguage: "plaintext",
    })
    // .extend({
    //   renderHTML({ node, HTMLAttributes }) {
    //     const highlighted = node.attrs.language
    //       ? lowlight.highlight(node.attrs.language, node.textContent)
    //       : lowlight.highlightAuto(node.textContent)
    //     const html = toHtml(highlighted)

    //     return ["pre", HTMLAttributes, ["code", { html }]]
    //   },
    // })
  ,
]