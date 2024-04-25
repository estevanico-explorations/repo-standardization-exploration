import { Logger } from '../types'
import { clean, append } from './writer'

/**
 * Unlink previous log files.
 */
export const cleanLogs = (): void => {
  clean('errors')
  clean('analytics')
}

/**
 * Function to append logs to an error or analytics file.
 *
 * @returns An object of multiple different logging functions
 */
export const logger = (): Logger => ({
  error: append('errors'),
  analytics: append('analytics'),
})

