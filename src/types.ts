/**
 * The two log types maintained within the app.
 */
export type LogTypes = 'analytics' | 'errors'

/**
 * The Append function type alias
 */
export type AppendFn = (msg: string) => void

/**
 * The callback return for the queueManager function
 */
export type QueueManager = (score: Score) => void

/**
 * A score to be processed
 */
export interface Score {
  score: number
  id: string
  metadata?: string
}

/**
 * Runner output object to be printed to the screen.
 */
export interface RunnerLogs {
  errorCount: string
  endMessage: string
  scores: Score[]
  analytics: string
  errors: string
}

/**
 * Shell args used to run the application.
 */
export interface ShellArgs {
  file: string
  count: number
}

/**
 * The logger return type
 */
export interface Logger {
  error: AppendFn
  analytics: AppendFn
}

/**
 * Error Message functions.
 */
export interface ErrorMessages {
  json: (lineCount: number, metadata: string) => string
  file: (path: string) => string
}

/**
 * The thing I'm least certain about here is how this will be used AND THEN it's
 * representation.
 *
 * USE:
 *    Would this be a package in which others can use to pull from giant
 *    datasets to parse and sort? If so then that means that the representation
 *    of the configuration file(s) would be important.
 *
 * REPRESENTATION:
 *    How the library will consume this configuration. This is important
 *    considering that there can be types and functions that can override
 *    functionality of the file processing object.
 */
export interface Options {
  // Config option path. Defaults
  config?: {
    // Config option path. Defaults to ./data/*
    loc?: string

    // File type. Defaults to nothing
    type?: 'FILE' | 'JSON' | 'YAML' | 'YML'
  }

  // Which way to sort the deets
  sort: 'ASC' | 'DESC'

  // The file to use to grab data.
  file?: string

  // The data processing function if it needs to be overridden
  reader?: any

  // Basically IoC stuff. Great for testing or using alternate functionality.
  // Very useful for testing.
  io?: {
    // If you'd like to change how logging works. i.e. Push to service than to
    // file
    logger?: any

    // The metrics interface to use.
    metrics?: any

    // The file reader/writing interface to use.
    file?: any
  }

  // Max entries to be stored in the heap.
  limit?: number

  // Display the progress bar
  progress?: boolean

  // Bail on the first error recieved.
  exitOnError?: boolean

  // Toggle what you desire to output to the screen.
  output?: {
    colour?: boolean // Defaults to false.
    header?: boolean
    errors?: boolean
    memory?: boolean
    scores?: boolean
    metadata?: boolean
  }

  // ---------------------------------------------------------------------------
  // Defines the shape that would be used in comparisons and sorting.
  shape?: unknown

  // The function that would read & sanitize score data
  // Not sure yet but this might be a major implimentation detail.
  dataSanitizer?: any

  // A heap function comparator. Defaults to internal comparator function
  comparator?: any

  // A function to handle sorting. Defaults to internal sort function
  sorter?: any
}
