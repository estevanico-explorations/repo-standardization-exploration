# Implmentation
- [Implmentation](#implmentation)
  - [Types](#types)
  - [Data Management](#data-management)
    - [Alternative 1](#alternative-1)
    - [Alternative 2](#alternative-2)
    - [Alternative 3](#alternative-3)

The `src/index.ts` file is the "`main()`" of the application. The entry point. This is where all the screen output is done. All the messages are bubbled up from downstream functions to keep them void of as much side effectual code as possible. It pulls in the script args to pass to the processor that will process the data file.

The `process()` function in `src/utils/process.ts` is where the program reads in the content a line at a time. It maintains the error count and lines read count. The `queueManager(log, heap, count)` is where the score management is handled. The log, heap and count are added to this "factory function" to return another function to mutate the `Heap()`. Also, I am using a `Heap()` library instead of writing my own but that also came with its own challenges.

Further down into the `queueManager()` each line is processed by splitting on the `: `. The API of the `heap-js` package is a bit confusing to work with so my logic seems a bit awkward. Essentially the heap is checked to see if the score already exists and if it does remove it and push in the new one. Then I check the length of the heap and if it's greater than the count I remove the bottom score from the heap.

## Types
```ts
export interface Score {
  score: number,
  id: string
}
```

## Data Management
The following snippet is a condensed version of what exists in the code. Optionally this could have been done w/o removing the existing `Score` but that would make the code a bit more complex where I'd have to have to update a `Score` entry's `id` to the new `id` or `heap.push(score)`. There really isn't that much difference but would have slightly better performance since removing would have to rebuild those connections. That's a minimal performance gain whereas the following is easier to read.

Note: The heap has 3 custom comparators for this API to handle objects. Those are not shown in the sample code below but can be seen in the `src/utils/score-manager.ts` file.

```ts
const addScore = (heap: Heap<Score>, score: Score, max: number) => {
  // If score exists remove the current one
  if (heap.contains(score, contains)) {
    heap.remove(score, remove)
  }

  // The new score is entered and this maintains the new ID.
  heap.push(score)

  // Maintain a maximum score count so delete the lowest when adding in a new item.
  if (heap.length > max) {
    heap.remove(heap.bottom()[0], remove)
  }
}
```

### Alternative 1
Another alternative I was considering was to just use a basic array. Using some pseudo code this is what it could have looked like. 

```ts
const addScore = (scores: Score[], score: Score, max: number): Score[] => {
  // Clone the scores object to not mess with the original
  let clone = [...scores]

  // If length is < max add
  if (scores.length < max) {
    clone.push(score)
  } else if (clone.find(score)) {
    delete clone[clone.find(score)]

    // Or just update, either or
    clone.push(score)
  }

  return [...clone]  
}
```

While this would work it wouldn't be sorted and secondly I would have to traverse the full array (max) each time I wanted to check if a score already exists within the scores array. That would me `max * fileLines` total execution each time a new score is going to be added.

### Alternative 2
Another option with `O(1)` complexity for lookup would be to use a `HashMap()`. In JS that would be a simple object.

```ts
interface Scores {
  values: number[]
  managed: {
    [key: number | string]: {
      score: number
      id: string
    }
  }
}

// example data
const scores: Scores = {
  values: [123123, 456456],
  managed: {
    123123: {
      score: 123123,
      id: 'joujHGV7uVKlqY4zQJiE3OdAtinccXYr'
    },
    456456: {
      score: 456456,
      id: 'joujHGV7uVKlqY4zQJiE3OdAtinccXYr'
    },
  }
}
```

From here I can simply check the object if a score exists in the `managed` property and update it if does; if not I need to determine if it's high enough to keep or to dump. The `values` array would be for debugging services. The issue of comparing and ordering the score values is still an issue like in the second alternative.

### Alternative 3
This last alternative is really just about how to display the values to the screen in the correct depending order. There are two ways of doing it.

| What                            | Reasoning                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Using `heap.pop()`              | Using a `while` (or `for`) loop to generate the ordered scores is native to the API and makes the most sense to do   |
| Using `heap.toArray().sort(fn)` | This is inarguably cleaner and easier to read but it's also doing more work but it is a little more "hacky" to some. |

The performance isn't going to suffer much in either version of this repo's use case as the counts will be relatively small (under 500?). The larger the return is the better option would be to use the native API. Either way it's up to the developer in which way to handle int.

