const fs = require("fs");

// const writeStream = fs.createWriteStream("copy-demo.mp4");
const writeStream2 = fs.createWriteStream("./file.txt");

// readStream.pipe(writeStream).on("error", console.error);

process.stdin.pipe(writeStream2).on("error", console.error);
