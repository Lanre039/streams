const fs = require("fs");
const http = require("http");
const file = "./playground/demo.mp4";

http
  .createServer((req, res) => {
    res.writeHeader(200, { "Content-Type": "video/mp4" });
    fs.createReadStream(file).pipe(res).on("error", console.log);
  })
  .listen(3000, () => console.log("stream - http://localhost:3000"));

// node --trace_gc "./playground/stream.js"
