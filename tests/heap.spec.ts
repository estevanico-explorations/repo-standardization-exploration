import { Heap } from 'heap-js'

import { scoreComparator, scores, queueManager} from '../src/utils/heap'
import { scores as scoreData } from './__mocks__/data'
import { logger } from '../src/utils/logging'

const scoreList = (scores) => {
  const heap = new Heap(scoreComparator)
  const addScore = queueManager(logger(), heap, 5)

  for (let i = 0; i < scores.length; i++) {
    addScore(scores[i])
  }

  return heap
}

describe('src/utils/heap.ts', () => {
  it('scores in order', () => {
    const scoresHeap = scoreList(scoreData)

    // It's easier to just compare a short array of integers.
    expect(scores(scoresHeap).map(e => e.score)).toEqual([ 123, 99, 92, 88, 83 ])
  })
})
