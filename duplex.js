const fs = require("fs");
const { PassThrough, Duplex } = require("stream");

const readStream = fs.createReadStream("demo.mp4");
const writeStream = fs.createWriteStream("copy-demo.mp4");

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final() {
    this.push(null);
  }
}

const report = new PassThrough();
const throttle = new Throttle(10);

let total = 0;
report.on("data", (chunk) => {
  // do anything with the data here
  total += chunk.length;
  console.log("bytes: " + total);
});

readStream.pipe(throttle).pipe(report).pipe(writeStream);
