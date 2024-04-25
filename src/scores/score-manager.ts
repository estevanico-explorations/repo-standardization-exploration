import { Heap } from 'heap-js'
import { Logger, QueueManager, Score } from '../types'

/**
 * Does the heap contain this score?
 *
 * @param a A score object
 * @param b A score object
 *
 * @returns True if the heap contains the Score
 */
export const contains = (a: Score, b: Score): boolean => a.score === b.score

/**
 * Remove this score from the heap.
 *
 * @param a A score object
 * @param b A score object
 *
 * @returns True if the score was removed.
 */
export const remove = (a: Score, b: Score): boolean => a.score === b.score

/**
 * Max heap comparison function to be used on .push()
 *
 * @param a A score object
 * @param b A score object
 *
 * @return 0 if they're equal, positive if `a` goes up, negative if `b` goes up
 */
export const scoreComparator = (a: Score, b: Score): number => {
  if (b.score < a.score) {
    return 1
  } else if (b.score > a.score) {
    return -1
  } else {
    return 0
  }
}

/**
 * Build a queue manager function to add scores to a heap.
 *
 * @param heap The heap
 * @param max The max count of Scores to keep
 *
 * @returns A QueueManager function to do the heap management
 */
export const queueManager = (log: Logger, heap: Heap<Score>, max: number): QueueManager => (score: Score): void => {
  log.analytics(`[SCORE]: ${score.score}\n[ID]: ${score.id}\n------\n`)

  heap.push(score)

  if (heap.length > max) {
    heap.remove(heap.bottom()[0], remove)
  }
}
