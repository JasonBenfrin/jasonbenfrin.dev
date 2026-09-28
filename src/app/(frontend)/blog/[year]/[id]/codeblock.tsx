import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { lowlight } from "../../editor/extensions"
import {Fragment, jsxs, jsx} from 'react/jsx-runtime'

interface ICodeBlockView {
  codeLang?: string
  textContent: string
}
export default function CodeBlockView({ codeLang, textContent }: ICodeBlockView) {
  const highlighted = codeLang
    ? lowlight.highlight(codeLang, textContent)
    : lowlight.highlightAuto(textContent)
  const reactNode = toJsxRuntime(highlighted, {
    Fragment,
    jsxs,
    jsx,
  })

  return <pre className="codeblock">
    <code className={codeLang ? `language-${codeLang}` : ""} >
      {reactNode}
    </code>
  </pre>
}