# Redis Server

We also need to run redis server instance to which connection object has to be
correctly specified on how to access it.

# Consumer Code

This repository contains the **consumer code** that processes given jobs from a
queue. Below is an example of how a producer can add jobs to the queue.

## Example Producer Code

```javascript
const { Queue } = require("bullmq");

const task_queue = new Queue("tasksQueue");

async function init() {
  const res = await task_queue.add("program1", {
    "language": "javascript",
    "version": "1.32.3",
    "files": [
      { "content": "console.log(2*3)" },
    ],
    "stdin": "",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_cpu_time": 10000,
    "run_cpu_time": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1,
  });

  console.log("added into queue");
}

init();
```
