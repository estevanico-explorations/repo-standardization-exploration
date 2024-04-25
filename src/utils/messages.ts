import figlet from 'figlet'
import { ErrorMessages, LogTypes } from '../types'

/**
 * The message to be displayed once the application completes
 *
 * @param lc The line count to display
 *
 * @return The final message.
 */
export const endMessage = (lc: number): string => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024
  const readable = Math.round(used * 100) / 100
  const dashes = '-------------------------------------------------------------\n'
  const lines = `Total lines processed: ${lc}\n`
  const memory = `The script uses approximately ${readable} MB of memory\n`

  return `${dashes}${lines}${memory}${dashes}`
}

/**
 * String to notify where log files exist.
 *
 * @param type The type of log
 *
 * @returns A string of the log type's path
 */
export const logPath = (type: LogTypes): string =>
  `${type} logs can be found here: ${type}.log`

/**
 * The CLI header to display before processing
 *
 * @returns string
 */
export const header = (): void =>
  figlet.textSync('FILE PROCESSOR')

/**
 * Error texts for various error types
 */
export const error: ErrorMessages = {
  json: (lineCount: number, metadata: string): string => {
    const error = `SyntaxError: Line ${lineCount} is not a valid JSON parsable string`
    const data = `Data: "${metadata}"`

    return `${error}\n${data}`
  },
  file: (path: string): string => `PATH ERROR: The file "${path}" does not exist`,
}
