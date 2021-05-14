const fs = require("fs");
const http = require("http");
const file = "./playground/demo.mp4";

http
  .createServer((req, res) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        console.log({ error });
      }
      res.writeHeader(200, { "Content-Type": "video/mp4" });
      res.end(data);
    });
  })
  .listen(3000, () => console.log("buffer - http://localhost:3000"));

// node --trace_gc "./playground/buffer.js"
