import Heap from 'heap-js'
import { Score } from '../types'
import { JsonParseError } from '../utils/errors'
import { treeAsString } from '../io/tree-printer'

/**
 * Memoize the output of a function given certain paramaters.
 *
 * A helper function so that I don't need to call a function multiple times
 * to get the same output. The memory savings are minimal but if processing
 * hundreds of thousands of lines in a file this would be a neat little
 * performance boost. Maybe convert to or use `fp-ts`'s memoize
 *
 * @see https://samhh.github.io/fp-ts-std/modules/Function.ts.html#memoize
 * @see https://tech.libresinn.com/cheatsheets/function/memoize-a-function/
 *
 * @param fn A function to be cached.
 *
 * @returns The passed in function to be called
 */
export const memoize = (fn: Function): Function => {
  const cache = {}

  return (...args) => {
    const key = JSON.stringify(args)

    if (cache[key]) {
      return cache[key]
    }

    const result = fn.apply(this, args)
    cache[key] = result

    return result
  }
}

/**
 * A score object builder.
 *
 * [NOTE]: Since this is a memoized function errors may still pose a threat but
 *    I'm not seeing that as the case with the generated examples files I've been
 *    using to test the application.
 *
 * @todo This function and either throw an exception or return a Score object
 *    I would prefer this to be handled by an Either() so that if there is an
 *    error I can still return the same object but with proper values so I
 *    needn't have to play with the code elsewhere.
 *
 *    It is also more descriptive knowing that it returns an Either() vs either
 *    a Score or Error type. An Either() would also remove the try/catch blocks
 *    needed in calling code and making everything much easier to read overall.
 *
 * @param line A string to parse
 *
 * @returns A score object
 */
export const scoreObj = memoize((line: string): Score | Error => {
  const [score, metadata] = line.split(/:(.*)/s)

  try {
    return {
      score: parseInt(score.trim()),
      id: JSON.parse(metadata).id,
      // metadata,
    }
  } catch (error) {
    throw new JsonParseError('Invalid JSON string. Cannot parse.', {
      score: parseInt(score),
      // metadata,
      id: '', // id doesn't matter
    })
  }
})

/**
 * A list of sorted scores from the score heap.
 *
 * @param heap The heap containing the scores. Regardless if heap is max or
 *    min the sort will pop from the top so it'll be sorted by the type.
 *
 * @returns An array of sorted scores.
 */
export const sortedScores = (heap: Heap<Score>): Score[] => {
  let ret = []

  for (let i = 0, elm; elm = heap.pop(); i++) {
    ret.push(elm)
  }

  return ret
}

/**
 * Order an array of scores.
 *
 * @deprecated Using a different function to sort now so this isn't needed.
 *    It is kept for reference only.
 *
 * @param a A score object
 * @param b A score object
 *
 * @returns A number representing the order in which to store
 */
export const sorter = (a: Score, b: Score): number => b.score - a.score

/**
 * A sorted list of the heap's array output in decending order.
 *
 * @deprecated Not used as I am now using the pop functionality.
 *    It is kept for reference only.
 *
 * @param heap The heap
 *
 * @returns A decending ordered array of scores. Uses array functions.
 */
export const scores = (heap: Heap<Score>): Score[] => heap.toArray().sort(sorter)
