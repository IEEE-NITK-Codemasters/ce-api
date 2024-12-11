// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  'tasksQueue',
  async (job: any) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data);

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        body: JSON.stringify(job.data)
      })

      if (!response.ok) {
        console.log('not successful')
      }
      const json = await response.json();
      console.log(json);
    }
    catch (err) {
      console.log(err)
    }
  },
  { connection },
);