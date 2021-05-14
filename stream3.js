const fs = require("fs");

const readStream = fs.createReadStream("demo.mp4");
const writeStream = fs.createWriteStream("copy-demo.mp4");

readStream.on("data", (chunk) => {
  const result = writeStream.write(chunk);
  if (!result) {
    // backpressure - pausing read stream until write stream is ready to handle more data
    console.log("backpressure");
    readStream.pause();
  }
});

readStream.on("end", () => {
  console.log("read stream finished");
  writeStream.end();
});

readStream.on("error", (error) => {
  console.log("an error occured");
  console.error(error);
});

writeStream.on("drain", () => {
  console.log("drained");
  readStream.resume();
});

writeStream.on("close", () => {
  process.stdout.write("file copied successfully!\n");
});
