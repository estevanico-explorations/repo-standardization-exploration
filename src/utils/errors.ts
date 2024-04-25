import { Score } from "../types"

/**
 * A custom Error class to allow meta data added to the Error's return.
 *
 * This is a convenience utility Error so I can log the info I need w/o doing
 * odd try/catch blocks and using extensive "let" declarations.
 */
export class JsonParseError extends Error {
  info: Score

  constructor(message: string, meta: Score) {
    super(message)
    this.info = meta
  }
}
