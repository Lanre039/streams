const { Transform } = require("stream");

class ReplaceText extends Transform {
  constructor(char) {
    super();
    this.replaceChar = char;
  }

  _transform(chunk, encoding, callback) {
    const transforChunk = chunk
      .toString()
      .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);
    this.push(transforChunk);
    callback();
  }

  // called at the end of the transform
  _flush(callback) {
    this.push("more stuff is being processed");
    callback();
  }
}

const xStream = new ReplaceText("x");

process.stdin.pipe(xStream).pipe(process.stdout);
