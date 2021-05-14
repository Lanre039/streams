const fs = require("fs");

const readStream = fs.createReadStream("demo.mp4");

readStream.on("data", (chunk) => {
  console.log("size ", chunk);
});
readStream.on("end", (chunk) => {
  console.log("read stream finished");
});

readStream.on("error", (error) => {
  console.log("an error occured");
  console.error(error);
});

readStream.pause();
process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "finish") {
    readStream.resume();
  }
  readStream.read();
});
