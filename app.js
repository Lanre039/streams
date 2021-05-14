const { promisify } = require("util");
const fs = require("fs");
const logUpdate = require("log-update");

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

// const delay = (sec, callback) => {
//   if (sec > 2) {
//     callback(new Error(`${sec} is too long.`));
//   } else {
//     callback(null, "All went well.");
//   }
// };

// const promiseDelay = promisify(delay);
// promiseDelay(5)
//   .then(console.log)
//   .catch((e) => console.log(e.message));

const writeFile = promisify(fs.writeFile);
// writeFile("sample.txt", "This is a sample file.")
//   .then(() => console.log("File created successfully"))
//   .catch((e) => console.log(e.message));

// const beep = () => process.stdout.write("\x07");
// beep();

async function start() {
  //   const files = await readdir("./");
  const files = await readdir(__dirname);
  console.log(files);
}
// start();

// RUN PROMISES AT ONCE - PARALLEL EXECUTION
// Promise.all([
//   unlink("readme.md"),
//   unlink("readme.txt"),
//   unlink("readme.json"),
//   unlink("readme.js"),
// ])
//   .then(() => readdir(__dirname))
//   .then((e) => console.log(e));

const delay = (sec) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });

const promises = [delay(1), delay(2), delay(3), delay(4), delay(5), delay(6)];

const toX = () => "X";

// RUN PROMISES CONCURRENTLY
class PromiseQueue {
  constructor(promises = [], concurrentCount = 1) {
    this.concurrent = concurrentCount;
    this.total = promises.length;
    this.todo = promises;
    this.running = [];
    this.complete = [];
  }

  get runAnother() {
    return this.running.length < this.concurrent && this.todo.length;
  }

  graphTasks() {
    const { todo, running, complete } = this;
    logUpdate(
      `
            
        todo: [${todo.map(toX)}]
        running: [${running.map(toX)}]
        complete: [${complete.map(toX)}]
            
        `
    );
  }

  run() {
    while (this.runAnother) {
      const promise = this.todo.shift();
      promise.then(() => {
        this.complete.push(this.running.shift());
        this.graphTasks();
        this.run();
      });
      this.running.push(promise);
      this.graphTasks;
    }
  }
}

const taskPromises = new PromiseQueue(promises, 2);
taskPromises.run();
