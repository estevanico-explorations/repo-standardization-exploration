# TODOs
- [TODOs](#todos)
  - [General](#general)
  - [Feature Upgrades](#feature-upgrades)
  - [IoC](#ioc)
  - [Functional Programming](#functional-programming)
  - [File Specific](#file-specific)
  - [Repo](#repo)
  - [Misc](#misc)

# Wishlist

[**`NOTE`**]: I plan to invest more time into the `Effect` ecosystem so I will move most of this code to a different repo or use `Effect` in this repo as I learn. 

## General
- Add auto importing with the [`unplugin-auto-import`](https://unplugin.unjs.io/showcase/unplugin-auto-import.html) module
  - I'm interested in the `eslint` stuff too
    - Example [config](https://github.com/nekobc1998923/vitecamp/blob/master/.eslintrc-auto-import.json)
    - `eslint` docs on [custom globals](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-configuration-objects)
  - Determine what would actually be auto-imported
  - Should work with different bundlers
    - `Rollup` 
    - `Vite`
    - `Webpack`
- Destroy history and reupload to github
- Remove any non useful comments
  - Clean up all documents
- Compare new solution with actual data
- Make the `bin` file something that is exported on build
  - Use `rollup` for this work
    - A different output file for this
  - Add it to the main `./src` directory
- Remove all `console.log` calls
  - Use the logger from the dependency tree
- Remove any unused functions

## Feature Upgrades
- Allow for custom runners
  - Currently it's file focused allow for others
    - Hard coded data
    - `JSON`/`YAML` data
- Add some events to things
  - i.e. custom logger
    - Mine writes to disc so I need to clean up before starting app
    - Allow for event integrations specifically for this
    - Other loggers may not need this functionality so it can be omitted

## IoC
- Make the `heap` an injectable
- Use `@injectable-ts/core` to inject dependencies
  - Then write better tests
- Convert to injectable functions
  - `src/scores/score-manager.ts → queueManager()`
  - `src/runners/process.ts → runner()`

## Functional Programming
- Convert to FP
  - `src/scores/transforms.ts → scoreObj()`
    - Make the `metadata` property a configurable option in the dep tree
  - `src/scores/transforms.ts → sortedScores()`
    - Not sure how tho since it's a loop
  - The runner & some other stuff should be converted to functional
    - Use `pipe()` or `flow()`

## File Specific
- File Specific stuff
  - `src/io/writer.ts`
    - Convert `runner()` to functional
      - This should use `@injectable-ts/core`
      - Might be a configurable option to inject
  - `src/configs/index.ts`
    - Add config functionality
  - `src/index.ts`
    - Allow for running the two different types of heaps
      - Live
      - Real
  - `src/utils/messages.ts`
    - Have this use a `YAML` configuration so that the content isn't hardcoded
      - Introduce internationalization using some sort of library
  - `src/scores/score-manager.ts`
    - `queueManager` needs to be injectable
  - `src/io/tree-printer.ts`
    - Make sure to note the main change here, why it's added AND 
    - Make a pull-request to the [ignlg/heap-js](https://github.com/ignlg/heap-js) GitHub repo
  - `src/io/cli.ts`
    - Needs to be injectable I think

## Repo
- Make sure everything is **STRICTLY TYPED**
- Make sure to add an `eslint` ruleset for functional programming (in `package.json`)
  - https://github.com/raveclassic/injectable-ts/blob/main/packages/core/.eslintrc.json
  - https://github.com/ignlg/heap-js/blob/master/.eslintrc.json
- Change name to something else entirely
- Make it public
- `tsconfig.json` configuration changes
  - Path aliases
  - Compile to single file
    - Source
    - Types
  - Use `tsc -w` if possible
  - So I don't need to rely on `nodemon`
- Remove `nodemon` as a dev dependency

## Misc
- Determine how to use `heap-js`'s `limit` functionality. Might be smarter than using the `heap.remove()` function
- Change `jest.config.js` to `jest.config.ts`
