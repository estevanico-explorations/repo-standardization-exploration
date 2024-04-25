console.clear()

import Heap from 'heap-js'
import { RunnerLogs } from './types'
import { treeAsString } from './io/tree-printer'
import { shellArgs } from './io/cli'
import { runner } from './runners/process'
import { header } from './utils/messages'
import { cleanLogs } from './io/logging'
import { scoreComparator } from './scores/score-manager'

// Runners
import sortTest from './runners/live.tests'

// sortTest([
//   { score: 300, id: '300' },
//   { score: 10, id: '10' },
//   { score: 20, id: 'twenty' },
//   { score: 10, id: 'TOP' },
//   { score: 23, id: '23' },
//   { score: 300, id: 'TOP' },
//   { score: 5, id: '5' },
// ])

/**
 * Cleanup and the welcome message.
 */
cleanLogs()
console.log(header())
const { file, count } = shellArgs()

runner(file, count).then((output: RunnerLogs) => {
  console.log(output.errorCount)
  console.log(output.endMessage)

  console.log('TOP SCORES '.padEnd(61, '-'))
  console.log(output.scores)
})
