console.clear()

import Heap from 'heap-js'
import { treeAsString } from '../io/tree-printer'
import { scoreComparator } from '../scores/score-manager'
import { Score } from '../types'

// TODO: Use reduce
export const sort = (heap: Heap<Score>): Score[] => {
  let ret = []

  for (let i = 0, elm; elm = heap.pop(); i++) {
    ret.push(elm)
  }

  return ret
}

export default (data: Score[]): void => {
  const heap = new Heap(scoreComparator)

  // Add each manually from the array above
  for (let i = 0; i < data.length; i++) {
    heap.push(data[i])
  }

  // heap.addAll(data)
  console.log(treeAsString(heap))
  console.log('\nsorted', sort(heap))
}
