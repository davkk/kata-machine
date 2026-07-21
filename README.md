## Developed live on twitch
[ThePrimeagen](https://twitch.tv/ThePrimeagen)

## Naming
### Lig-Machine
Lengthy Instrumentation Generating Massive Anticompetitive Computational Help for Intermediate Coders // n9

### Ligmata
Literal Improvement Gaining Master and Tutelage on Algorithms
Let's Intelligently Generate Multiple Algorithm Training Assessments // permdaddy

### Sugma Nuts
Studious Users Get Major Abilities. New Useful Training for Students

### Ligma Farts
Learn Intermediate Groundbreaking Massive Algorithms. Free Algorithm Research & Training System


### If you have a suggestion
make an issue and we will come up with the potential name.

### WARNING
I have just started to add algorithms, so the number of supported algorithms is
limited at the moment, but will grow fairly quick.

### WARNING
OUT OF DATE.  We have quite a few more.  need to update
### Supported Algorithm
* Insertion sort
* Merge sort
* QuickSort
* Prim's MST (Adjacency List)
* Dijkstra's Shortest Path (Adjacency List)

### Supported Data Structures
* Singly linked list
* Doubly linked list
* Queue
* Stack
* Graph with Adjacency List
* Graph with Adjacency Matrix (untested)

### How It Works

Make sure you have [Node.js](https://nodejs.org/en/) installed.

clone the repo and install the dependencies

```bash
npm install
```

pick 3 random katas (will not repeat from previous day):
```bash
npm run pick
```

create a day of katas, this will use the list in the `ligma.config.js`.
```bash
npm run generate
```

this will progressively create folders named

```
src/day1
src/day2
...
```

`npm run generate` will also update the `tsconfig.json` and `jest.config` to point
the latest `day` folder via tspaths.  This allows us to avoid updating anything
for testing each day.

#### Testing
```
npm test
```

I have yet to create a testing strategy for next sets of algorithms, but we
will get there when i cross that bridge.

### Help wanted
A simple way to specify test, thinking something like `tests.json` and `cat
test.json 2> /dev/null` to specify the tests to run.  tests.json wouldn't be
committed.
