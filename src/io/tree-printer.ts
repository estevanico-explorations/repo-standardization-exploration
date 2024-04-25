import Heap from 'heap-js'
import { Score } from '../types'

export const treeAsString = (heap: Heap<Score>): string => {
  function deep(i: number) {
    const pi = Heap.getParentIndexOf(i)
    return Math.floor(Math.log2(pi + 1))
  }

  function repeat(str: string, times: number) {
    let out = ''
    for (; times > 0; --times) {
      out += str
    }
    return out
  }

  let node = 0
  const lines: Array<Array<string>> = []
  const maxLines = deep(heap.length - 1) + 2
  let maxLength = 0

  while (node < heap.length) {
    let i = deep(node) + 1
    if (node === 0) {
      i = 0
    }

    // Text representation
    const obj = heap.get(node)
    // const nodeText = String(heap.get(node).score)
    const nodeText = String([...Object.values(obj)])
    if (nodeText.length > maxLength) {
      maxLength = nodeText.length
    }
    // Add to line
    lines[i] = lines[i] || []
    lines[i].push(nodeText)
    node += 1
  }

  return lines
    .map((line, i) => {
      const times = Math.pow(2, maxLines - i) - 1
      return (
        repeat(' ', Math.floor(times / 2) * maxLength) +
        line
          .map((el) => {
            // centered
            const half = (maxLength - el.length) / 2
            return repeat(' ', Math.ceil(half)) + el + repeat(' ', Math.floor(half))
          })
          .join(repeat(' ', times * maxLength))
      )
    })
    .join('\n')
}

