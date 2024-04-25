/**
 * The functions herein are to handle default flags like how many to keep
 * in-memory or how things are displayed when it's complete.
 *
 * Otherwise everything else is to handle functional extendability. You can, for
 * instance, override the shape, comparator and reader. That's all IoC. It would
 * be useful for extending the package but also for testing. We shouldn't need
 * to mock, stub or spy on a function when it's using a file read/write
 * interface. So doing this allows for easy injection overriding.
 */
import { Options } from '../types'

/**
 * Functions to handle configuration options that come either from the commandline or a file.
 */
export const options: Options = {
  file: '',
  limit: 10,
  sort: 'ASC',

  // Shape stuff
  shape: null,
  comparator: () => {},
  sorter: () => {},
}
