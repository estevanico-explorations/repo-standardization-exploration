import { program } from 'commander'
import { ShellArgs } from '../types'

/**
 * Setup & get arguments nessessary to run the application. There are 2 args:
 *    1. -f, --file → A required. The path to the file to process
 *    1. -c, --count → The amount of scores to keep track.
 *
 * It is side effectual code and am not a fan of that but
 * it is to be used at the highest level of the application so
 * that works out just fine.
 *
 * @returns Relevant args to run the application.
 */
export const shellArgs = (): ShellArgs => {
  program
    .option('-c, --count <count>', 'Records to keep')
    .requiredOption('-f, --file <file>', 'Path to file to parse')

  program.parse()

  const options = program.opts()
  const count = options.count ? parseInt(options.count) : 10
  const file = options.file

  return { count, file }
}
