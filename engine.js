const { Marp } = require('@marp-team/marp-core')

// 각주 문법: 링크 참조 주석 `[//]: # "내용"` (또는 '내용' / (내용))을 슬라이드 하단 각주로 렌더링.
// GitHub 등 일반 마크다운 뷰어에서는 원래대로 숨겨진 참조 정의로 처리되어 보이지 않음.
const FOOTNOTE_RE = /^\[\/\/\]:\s*#\s*(?:"([^"]*)"|'([^']*)'|\(([^)]*)\))\s*$/

module.exports = (opts) => {
  const marp = new Marp(opts)

  marp.markdown.block.ruler.before(
    'reference',
    'plass_footnote',
    (state, startLine, endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine]
      const end = state.eMarks[startLine]
      const match = FOOTNOTE_RE.exec(state.src.slice(start, end))
      if (!match) return false
      if (silent) return true

      const token = state.push('plass_footnote', '', 0)
      token.content = match[1] ?? match[2] ?? match[3] ?? ''
      token.map = [startLine, startLine + 1]

      state.line = startLine + 1
      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] },
  )

  marp.markdown.core.ruler.after(
    'marpit_directives_apply',
    'plass_footnote_place',
    (state) => {
      if (state.inlineMode) return

      const newTokens = []
      let pending = []

      const flush = () => {
        if (!pending.length) return
        const items = pending
          .map((text) => `<p>${state.md.renderInline(text, state.env)}</p>`)
          .join('')
        const token = new state.Token('plass_footnotes_block', '', 0)
        token.content = `<div class="plass-footnotes">${items}</div>`
        newTokens.push(token)
        pending = []
      }

      for (const token of state.tokens) {
        if (token.type === 'plass_footnote') {
          pending.push(token.content)
          continue
        }
        if (token.type === 'marpit_slide_close') flush()
        newTokens.push(token)
      }
      flush()

      state.tokens = newTokens
    },
  )

  marp.markdown.renderer.rules.plass_footnotes_block = (tokens, idx) =>
    tokens[idx].content

  return marp
}
