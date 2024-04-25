# Running
- [Running](#running)
  - [Dev Mode](#dev-mode)
  - [Production mode](#production-mode)
      - [Valid Data](#valid-data)
      - [Invalid Data](#invalid-data)
  - [Tests](#tests)

## Dev Mode
To run the code in the various `dev mode`s then run either of the following commands. Reasoning behind wanting to run in `dev mode` is to make changes and be able to run the code w/o having to clean and/or build it first.

```sh
# If you desire to make changes to the code and see the results live
# This is in watch mode and it isn't possible to change the passed in parameters
# to nodemon. If argument changes are required you must modify nodemon.json on
# line 8. The flags are -f for the file & -c for how many high scores to
# maintain
npm run dev:live

# This isn't in watchmode as it's to see the exit code when a bad file argument is supplied
npm run dev:badfile
```

## Production mode
#### Valid Data
Run the application with valid data
```sh
npm run cln; \
  npm run gen-mocks:small; \
  npm run build; \  
  node .build/index.js -f data/scores.data -c 10
```

#### Invalid Data
Run the application with invalid file
```sh
npm run cln; \
  npm run gen-mocks:small; \
  npm run build; \
  node .build/index.js -f data/foo/bar -c 10
```

## Tests
```sh
# Run the tests once
npm run test

# Run the tests in watch mode
npm run test:watch
```

