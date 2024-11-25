[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/VTYnVZbi)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17009690)
## CS472-Node-Event-Loop
### Update the `README.md` file, to include the answers to the following questions:
1. What is LibUV?
- LibUV is a multi-platform, open-source library in Node.js responsibly for handling asynchronous I/O operations and providing the non-blocking I/O model that Node.js is known for.

2. How does Node.js handle I/O operations asynchronously? What role does the event loop play in this process?
- Node.js using an event loop and LibUV. When an I/O task starts, Node.js doesn't wait for it finish. Instead, It register a callback, offload tasks to LibUV and move to other code.
- The event loop check if any tasks are done. When an I/O task finishes, Node add its callback to the queue. Then event loop then run this callback when it's ready. The non-blocking methods lets Node.js handling many task at once, keeping it fast and responsive.

3. What are the advantages and limitations of a single-threaded model?
- Advantages:
   + Easy to code and debug.
   + It is efficient with I/O operations and great for handling many connections at once without blocking.
   + It doesn't create multiple threads so it uses less memory.
- Limitations:
   + Can slow down if handling CPU-heavy tasks, because only one task runs at a time.

4. What is the difference between `setImmediate(f)` and `setTimeout(f, Time)`? 
- `setImmediate(f)` typically runs sooner than `setTimeout(f, Time)`, because it doesn't wait for the timer phase. But it also depends on when these function are called during the event loop.
- `setImmediate(f)` goes to check queue and runs right after the I/O event finishes.
- `setTimeout(f, Time)` goes to timer queue and runs after a time delay.

5. What is the difference between `process.nextTick(f)` and `setImmediate(f)`?
- `process.nextTick(f)` goes to nextTick queue, is not included in the event loop and this queue is higher priority than the even loop. Therefore, `process.nextTick(f)` runs sooner than `setImmediate(f)`.

6. What is the difference between `process.nextTick(f)` and `queueMicrotask(f)`?
- `queueMicrotask(f)` goes to Microtask queue, is lower priority than `process.nextTick(f)` so it runs after all tasks in nextTick queue finish.

7. Name 10 of Node Core modules
- fs, http (https), path, os, url, events, stream, crypto, util, zlib

8. Name 10 of Node Global objects
- global, process, Buffer, require, module, setTimeout (clearTimeout), setInterval (clearInterval), console, setImmediate, queueMicrotask

#### Navigate to the `test` folder, run `npm i`
Write down your observation and explain what happens in Node when you run the following commands:
   1. `npm run start`  
   2. For Windows: `SET UV_THREADPOOL_SIZE=2 && npm run start`
   3. For MacOS: `export UV_THREADPOOL_SIZE=2 && npm run start`

When running `npm run start` we saw that the processed completed faster than run `export UV_THREADPOOL_SIZE=2 && npm run start`. 
because the default value of UV_THREADPOOL_SIZE is 4, it runs faster than 2.
