import fs from 'fs'

export const configs = {
  // Not the preferred way
  FILE_INTERFACE: fs,

  // Would prefer nested
  IO: {
    FILE_INTERFACE: fs,
  },
}
