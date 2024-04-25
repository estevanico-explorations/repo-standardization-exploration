import fs from 'fs'
import path from 'path'

import readline, { Interface } from 'readline'
import { error } from '../utils/messages'
import { logger } from './logging'
import { AppendFn, LogTypes } from '../types'

/**
 * Delete files that already exist
 *
 * The application logging appends to a file and if this application runs often
 * we would be in danger of creating massive files and take up all the space.
 * Since this is just an example application this is fine. If this was a production
 * application then the logging and analytics would go to a service.
 *
 * @param type A string of two types that can be used to clean their respective
 *    log files
 */
export const clean = (type: LogTypes): void => {
  const file = path.resolve(__dirname, '..', '..', `data/${type}.log`)
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
}

/**
 * Append a log message to a specified tile
 *
 * @param msg The message to log.
 *
 * @returns A callback function to append to a specified log file type
 */
export const append = (type: LogTypes): AppendFn => (msg: string): void => {
  const filePath = path.resolve(__dirname, '..', '..', `data/${type}.log`)

  fs.appendFileSync(filePath, msg + '\n', 'utf8')
}

/**
 * A utility function to create a line reader for a given file path.
 *
 * @note I decided not to show the entire stack trace to the screen if
 *    the file doesn't exist and instead respond with a simpler message
 *    and put the stack trace into the log file.
 *
 *    If viewing it on the console is desired then simple uncomment the
 *    throw new line and comment the process.exit line.
 *
 * @param file
 *
 * @returns A readline interface
 */
export const reader = (file: string): Interface => {
  const filePath = path.resolve(__dirname, '..', '..', file)
  const log = logger()

  if (!fs.existsSync(filePath)) {
    const msg = error.file(filePath)
    const err = new Error(msg)

    log.error(`${msg} \n\n[STACK]\n${err.stack}`)
    console.log(msg)

    // Uncomment this if a stack trace printed to the screen is desired.
    // throw new Error(msg)

    process.exit(1)
  }

  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  return rl
}
