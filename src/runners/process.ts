// Packages
import events from 'events'
import { Heap } from 'heap-js'

// Source files.
import { reader } from '../io/writer'
import { logger } from '../io/logging'
import { RunnerLogs } from '../types'
import { endMessage, logPath, error as msg } from '../utils/messages'
import { queueManager, scoreComparator } from '../scores/score-manager'
import { scoreObj, sortedScores } from '../scores/transforms'

/**
 * The file parsing application
 *
 * O(n) * O(log(n))
 *
 * @param file The file to read
 * @param count The max scores to be saved
 *
 * @returns Status messages to be printed to the screen
 */
export const runner = async (file: string, count: number): Promise<RunnerLogs> => {
  const log = logger()
  const rl = reader(file)
  const heap = new Heap(scoreComparator)
  const addScore = queueManager(log, heap, count)

  var lineCount = 0
  var errorCount = 0

  rl.on('line', (line: string) => {
    lineCount++

    try {
      addScore(scoreObj(line))
    } catch (err) {
      errorCount++
      log.error(msg.json(lineCount, err.info.metadata))
    }
  })

  await events.once(rl, 'close')

  console.log()

  return {
    errorCount: `Error Count: ${errorCount}`,
    endMessage: endMessage(lineCount),
    scores: sortedScores(heap),
    analytics: logPath('analytics'),
    errors: logPath('errors'),
  }
}

